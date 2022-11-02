export { GetDataFromApiAsync, GetAgeDataFromApiAsync }

/**
 * Retrieves data from single API call
 * 
 * @param {string} url url to API
 * @returns data retrieved from API
 */
async function GetDataFromApiAsync(url) { 
    try {
        const response = await fetch(url);

        return response.json();
    }
    catch(err){
        alert(err);
    }
}

/**
 * Retrieves age data from multiple API calls
 * 
 * @param {string[]} nameArray array of names
 * @returns array of inventors age
 */
async function GetAgeDataFromApiAsync(nameArray, baseUrl) 
{
    const ageData = await Promise.all(nameArray[0].map(async (name) => {
            try{
                const response = await fetch(`${baseUrl}getdate/${name}`);
 
                const yearInMiliseconds = 31556952000;
 
                return await response.json().then((age) => 
                {
                    if(age.Death != null)
                    {
                       return Math.floor((Date.parse(age.Death) - Date.parse(age.Birth)) / yearInMiliseconds);
                    }
                    else
                    {
                        return Math.floor((Date.now() - Date.parse(age.Birth)) / yearInMiliseconds);
                    }
                });
            }   
            catch(err){
                alert(err);
            }
        })
    );
 
    return ageData;
}