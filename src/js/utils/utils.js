import { GetDataFromApiAsync, GetAgeDataFromApiAsync } from "../services/FetchApi.js"
import { TechInventor } from "../models/TechInventor.js";
import { baseApiUrl } from "../config/config.js";

export { GetInventorsDataAsync }

/**
 * 
 * @param  {type[]} arr n arrays
 * @returns zipped array
 */
const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill().map((_,i) => arr.map(a => a[i])); 


/**
 * Retrieves inventors data from the apis
 * 
 * @returns InventorsData
 */
async function GetInventorsDataAsync()
{
    let namesData = GetDataFromApiAsync(`${baseApiUrl}names`);
    let techData = GetDataFromApiAsync(`${baseApiUrl}tech`);
    let ageData = Promise.all([namesData]).then((values) => {
        return GetAgeDataFromApiAsync(values, baseApiUrl);
    });
 
    let techInventorsArray = await Promise.all([namesData, techData, ageData]);
     
    techInventorsArray = zip(techInventorsArray[0], techInventorsArray[1], techInventorsArray[2]).map((values) => {
        return new TechInventor(values[0], values[1], values[2]);
    });
     
    return techInventorsArray;
}
