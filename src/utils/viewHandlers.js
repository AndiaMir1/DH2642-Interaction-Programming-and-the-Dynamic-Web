export function onEnterKey(action){
    return function(event){
        if(event.key ==="Enter"){
            event.preventDefault();
            action()
        }
    };
}

export function showPop(newC) {
    var elem = document.getElementById('bg-modal');
    elem.style.display = newC;
}
