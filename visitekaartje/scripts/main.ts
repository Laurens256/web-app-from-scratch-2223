const fetchData = async () => {
	const response: any = await fetch(
		'https://cors-anywhere.herokuapp.com/https://whois.fdnd.nl/api/v1/member?id=cldczhjad16yh0av08jxscp0a'
	);
	console.log(response);
};
fetchData();

let albumState: 0 | 1 = 0;
const flipAlbum = () => {

};
