export { TechInventor }

/**
 * Tech inventor class
 */
class TechInventor{
    name;
    tech;
    age;

    constructor(val){
        this.name = val.name;
        this.tech = val.tech;
        this.age = this.calcAge(val.Death, val.Birth)
    }

    calcAge(death, birth) {
        const yearInMiliseconds = 31556952000;
        if(death != null)
        {
            return Math.floor((Date.parse(death) - Date.parse(birth)) / yearInMiliseconds);
        }
        else
        {
            return Math.floor((Date.now() - Date.parse(birth)) / yearInMiliseconds);
        }
    }
}