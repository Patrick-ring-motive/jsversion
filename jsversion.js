
window.version=[0,0,0,0];

void async function main(){

let currentVersion = await loadVersion();
console.log(currentVersion);

}();

function loadScript(src) {
    return new Promise(function promise(resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}


function tryVersion(num,i){
	
	if(i==0){
		
		return tryFirstVersion(num);
		
	}
	if(i==1){
		
		return trySecondVersion(num);
		
	}
	if(i==2){
		
		return tryThirdVersion(num);
		
	}
	if(i==3){
		
		return tryFourthVersion(num);
		
	}
	
	
}

function tryFirstVersion(num) {
	
	
    return new Promise(function promise(resolve, reject) {
        var s;
		
        s = document.createElement('script');
        s.innerHTML = 'window.version[0]='+num+';document.currentScript.onload();';
		s.setAttribute('language','Javascript'+num+'.0');
        s.onload = resolve;
        document.head.appendChild(s);
		var follow = document.createElement('script');
		follow.innerHTML = 'document.currentScript.onload();';
		follow.onload = resolve;
		document.head.appendChild(follow);
    });
}

function trySecondVersion(num) {
	
	
    return new Promise(function promise(resolve, reject) {
        var s;
		
        s = document.createElement('script');
        s.innerHTML = 'window.version[1]='+num+';document.currentScript.onload();';
		s.setAttribute('language','Javascript'+version[0]+'.'+num);
        s.onload = resolve;
        document.head.appendChild(s);
		var follow = document.createElement('script');
		follow.innerHTML = 'document.currentScript.onload();';
		follow.onload = resolve;
		document.head.appendChild(follow);
    });
}

function tryThirdVersion(num) {
	
	
    return new Promise(function promise(resolve, reject) {
        var s;
		
        s = document.createElement('script');
        s.innerHTML = 'window.version[2]='+num+';document.currentScript.onload();';
		s.setAttribute('language','Javascript'+version[0]+'.'+version[1]+'.'+num);
        s.onload = resolve;
        document.head.appendChild(s);
		var follow = document.createElement('script');
		follow.innerHTML = 'document.currentScript.onload();';
		follow.onload = resolve;
		document.head.appendChild(follow);
    });
}

function tryFourthVersion(num) {
	
	
    return new Promise(function promise(resolve, reject) {
        var s;
		
        s = document.createElement('script');
        s.innerHTML = 'window.version[3]='+num+';document.currentScript.onload();';
		s.setAttribute('language','Javascript'+version[0]+'.'+version[1]+'.'+version[2]+'.'+num);
        s.onload = resolve;
        document.head.appendChild(s);
		var follow = document.createElement('script');
		follow.innerHTML = 'document.currentScript.onload();';
		follow.onload = resolve;
		document.head.appendChild(follow);
    });
}

async function getVersion(i){
	


let upperLimit = 0;
let nextVersion = 0;
let doubling = true;
while(doubling){
nextVersion = version[i];
if(nextVersion==0){nextVersion=1;}else{nextVersion=nextVersion*2;}

await tryVersion(nextVersion,i);

	if(nextVersion > version[i]){
	
		upperLimit = nextVersion;
		doubling = false;
	
	}
}

let halving = true;
while(halving){
	
	if(upperLimit<=(version[i]+1)){
		halving=false;
	}
	nextVersion = Math.floor((version[i] + upperLimit)/2);
	await tryVersion(nextVersion,i);	
	if(nextVersion > version[i]){
		upperLimit = nextVersion;
	}
	
}

return version[i];
	
	
}


async function loadVersion(){

await getVersion(0);
await getVersion(1);
await getVersion(2);
await getVersion(3);
return version;

}




