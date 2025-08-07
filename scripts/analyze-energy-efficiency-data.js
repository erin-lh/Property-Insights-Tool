// Fetch and analyze the energy efficiency data
const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Copy%20of%20Energy%20Effiency%20_%20Full%20Scope-c7ZsPvrZ9QHT6kgZiI5UB1r58mQfwO.csv');
const csvText = await response.text();

console.log('Energy Efficiency CSV Data:');
console.log('Raw CSV:', csvText);

// Parse CSV data
const lines = csvText.split('\n').filter(line => line.trim() !== '');
const headers = lines[0].split(',').map(h => h.trim());

console.log('Headers:', headers);

// Parse each row
const energyData = {};
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',');
  const name = values[1]?.trim(); // Name/Label column
  const result = values[2]?.trim(); // Result column
  
  if (name && result) {
    energyData[name] = result;
    console.log(`${name}: ${result}`);
  }
}

console.log('\nParsed Energy Data:', energyData);

// Extract specific energy efficiency metrics
const energyMetrics = {
  allElectricHome: energyData['All Electric Home'] || 'Unknown',
  solarPanels: energyData['Solar Panels'] || 'Unknown',
  batteryStorage: energyData['Battery Storage'] || 'Unknown',
  electricVehicleCharging: energyData['Electric Vehicle Charging'] || 'Unknown',
  smartMeter: energyData['Smart Meter'] || 'Unknown',
  energyRating: energyData['Energy Rating'] || 'Unknown',
  heatingSystem: energyData['Heating System'] || 'Unknown',
  coolingSystem: energyData['Cooling System'] || 'Unknown',
  hotWaterSystem: energyData['Hot Water System'] || 'Unknown',
  insulation: energyData['Insulation'] || 'Unknown',
  windowType: energyData['Window Type'] || 'Unknown',
  lightingType: energyData['Lighting Type'] || 'Unknown'
};

console.log('\nExtracted Energy Metrics:', energyMetrics);
