function load(arr,cb) {
    let len = arr.length, total = 0;
    let head= document.getElementsByTagName('head')[0]; 
    arr.forEach(item => {
        let script= document.createElement('script'); 
        script.type= 'text/javascript';
        script.src= item; 
        head.appendChild(script);
        script.onload= function(){
            total += 1;
            if (len === total) {
                cb();
            }
        };
    });
    
} 