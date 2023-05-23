
const calculateResult = (w, obt, total) => {
	
	return Math.round(((obt/total)*w) * 100) / 100;
}
module.exports = {calculateResult}
