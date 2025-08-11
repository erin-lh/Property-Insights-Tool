// Google Sheets integration utilities
import type { RoomData } from './data-parser'

export interface SheetsApiResponse {
  success: boolean
  data: Record<string, RoomSheetData>
  cached: boolean
  timestamp: number
  totalRooms?: number
  warning?: string
  error?: string
  message?: string
}

export interface RoomSheetData {
  roomId: string
  roomType: string
  sheetName: string
  data: Record<string, any>
}

/**
 * Fetch room data from Google Sheets API
 */
export async function fetchSheetsData(): Promise<SheetsApiResponse> {
  try {
    const response = await fetch('/api/sheets')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching sheets data:', error)
    return {
      success: false,
      data: {},
      cached: false,
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Force refresh sheets data
 */
export async function refreshSheetsData(): Promise<SheetsApiResponse> {
  try {
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error refreshing sheets data:', error)
    return {
      success: false,
      data: {},
      cached: false,
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Generate composite key for room matching
 */
export function generateRoomKey(roomId: string, roomType: string): string {
  return `${roomId}_${roomType}`.toLowerCase()
}

/**
 * Merge Google Sheets data with existing room data
 */
export function mergeRoomWithSheetsData(room: RoomData, sheetsData: Record<string, RoomSheetData>): RoomData {
  const roomKey = generateRoomKey(room.id, room.type)
  const sheetData = sheetsData[roomKey]
  
  if (sheetData) {
    return {
      ...room,
      sheetData: {
        sheetName: sheetData.sheetName,
        lastSync: Date.now(),
        data: sheetData.data
      }
    }
  }
  
  return room
}

/**
 * Merge all rooms with sheets data
 */
export function mergeRoomsWithSheetsData(rooms: RoomData[], sheetsData: Record<string, RoomSheetData>): RoomData[] {
  return rooms.map(room => mergeRoomWithSheetsData(room, sheetsData))
}

/**
 * Check if room has recent sheets data (within last 10 minutes)
 */
export function hasRecentSheetsData(room: RoomData): boolean {
  if (!room.sheetData?.lastSync) return false
  const tenMinutesAgo = Date.now() - (10 * 60 * 1000)
  return room.sheetData.lastSync > tenMinutesAgo
}

/**
 * Format sheet data for display
 */
export function formatSheetDataForDisplay(sheetData: Record<string, any>): Array<{ key: string, value: string, label: string }> {
  const excludeKeys = ['roomid', 'room_id', 'roomtype', 'room_type']
  
  return Object.entries(sheetData)
    .filter(([key]) => !excludeKeys.includes(key.toLowerCase()))
    .map(([key, value]) => ({
      key,
      value: value?.toString() || '',
      label: formatKeyAsLabel(key)
    }))
    .filter(item => item.value.trim() !== '')
}

/**
 * Convert snake_case or camelCase to readable label
 */
function formatKeyAsLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}

/**
 * Get sync status message
 */
export function getSyncStatusMessage(room: RoomData): string {
  if (!room.sheetData) return 'No sheet data'
  
  const lastSync = room.sheetData.lastSync
  if (!lastSync) return 'Never synced'
  
  const now = Date.now()
  const timeDiff = now - lastSync
  const minutes = Math.floor(timeDiff / (1000 * 60))
  
  if (minutes < 1) return 'Just synced'
  if (minutes === 1) return '1 minute ago'
  if (minutes < 60) return `${minutes} minutes ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  
  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}
