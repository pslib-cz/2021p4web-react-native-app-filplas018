const randomCarGenerator = () =>{
    let cars = ["yellow", "black", "orange", "purple", "green"];
    let rand = Math.floor(Math.random() * 5);
    return "./assets/cars" + cars[rand] + "_car.png";
}
export default randomCarGenerator;