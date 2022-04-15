
const randomCarGenerator = () =>{

    
    let cars = ["yellow", "black", "orange", "purple", "green"];
    return "./assets/cars/" + cars[getRandomInt(0,5)] + "_car.png";
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
export default randomCarGenerator;