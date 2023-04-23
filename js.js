var didScroll; // 스크롤시에 사용자가 스크롤했다는 것을 알림 
const header =document.querySelector('header'); 
$(window).scroll(function(event){ 
    didScroll = true; 
});
// hasScrolled()를 실행하고 didScroll 상태를 재설정 
setInterval(function() {
    if (didScroll) { 
        hasScrolled(); 
        didScroll = false;
    } 
}, 250); 


function hasScrolled() {
    // 동작을 구현 
    // header.style.opacity = `30%`;
}
// 스크롤을 내릴 때 헤더 부분 반 투명화
//1.스크롤을 내렸을때 boolean
//2.





//메뉴버튼  구현/상단
const hd_menu = document.querySelector('.menu');
const add_adr = document.querySelector('.add_adr');
const maybe_ul = document.querySelector('.maybe_ul');
let index1 = 0;//메뉴버튼 display구분용 index
const adr_id = document.querySelector('#adr_id');
const adr_url = document.querySelector('#adr_url');
const maybe_li = document.querySelector('.maybe_li');
// const arry=[];//localStorage 저장을 위한 배열//★
let arry = JSON.parse(localStorage.getItem('maybe_ul')) || [];
function Add_menu() {//메뉴버튼을 누르면 메뉴 활성화
    if (index1 == 0) {
        add_adr.style.display = 'flex';
        ++index1
        
    }
    else {
        Add_reset();
    }
}
//마우스를 해당 메뉴가 아닌 다른곳에 이벤트가 생겼을경우 리셋
window.onclick = function(event) {
    if (!hd_menu.contains(event.target) && add_adr.style.display === 'flex') {
        // contains() 메서드는 인자로 받은 요소(event.target)가 이벤트가 발생한 요소의 자식 요소인지 확인할 수 있습니다.
        Add_reset();
    }
}
// window.onclick = function(event) {
//     if (!event.target.matches(hd_menu)&&add_adr.style.display==='flex') {//event.target.matches(hd_menu) 항상 false
//         Add_reset();
//     }
// }
//name,url을 입력한 후 확인버튼 함수
function Add_ok() {
    if (adr_id.value == '' || adr_url.value == '') {
        alert('제대로 입력하세요');
    } else {
        let arry2 = {
            name:adr_id.value,
            url:adr_url.value
        };
        arry.push(arry2);
        localStorage.setItem('maybe_ul',JSON.stringify(arry));
        creat_li(adr_id.value, adr_url.value); // li 요소를 생성하고 버튼을 추가
    }
    Add_reset();
}
//ul에 a,li,bt을 생성하는  함수
function creat_li(name, url) {
    let li = document.createElement('li');
    let a = document.createElement('a');                
    li.innerHTML = name;
    li.classList.add('maybe_li');
    a.target='_blank';
    a.href=url;
    a.appendChild(li);
    maybe_ul.appendChild(a);
    
    let bt = document.createElement('button'); // 버튼 생성
    bt.innerHTML = 'X';
    bt.classList.add('adr_del_bt');
    li.appendChild(bt);// 버튼을 li 요소의 하위 요소로 추가
    
    bt.addEventListener('click', function(event) {
        del_li(this,event);
        })
}
//생성된 bt에 제거하는 함수
function del_li(bt,event) {
    event.preventDefault(); // 기본 이벤트인 링크 이동을 막습니다.
    if (confirm('정말 삭제할까요?')) {
        const parentLi = bt.parentNode;//this.parentNode==='li'
        const parentA = parentLi.parentNode;
        const parentALI=bt.parentNode.parentNode;
        // this는 이벤트가 발생한 요소를 가리킵니다. 이벤트 핸들러 함수 내부에서 this를 사용하면, 그 함수가 등록된 요소를 가리키게 됩니다.
        // const name = parentLi.textContent;
        // const name = parentLi.previousSibling.textContent.trim();
        const name = parentLi.firstChild.textContent.trim();
        console.log(name);
        const url = parentA.getAttribute('href');
        parentALI.remove(); // 상위노드 a<li 제거



        //localStorage에서도 제거
        const index = arry.findIndex(item => item.name === name && item.url === url);console.log(index)
        if (index > -1) {
            arry.splice(index, 1);
            localStorage.setItem('maybe_ul', JSON.stringify(arry));
            console.log('저장')
        }
// splice()는 배열에서 요소를 삭제하거나 추가하는 메소드입니다. splice() 메소드는 세 개의 매개변수를 받습니다.
// 첫 번째 매개변수는 삭제를 시작할 인덱스입니다. 배열에서 해당 인덱스부터 요소를 제거합니다.
// 두 번째 매개변수는 삭제할 요소의 개수입니다. 만약 이 값이 0이면 요소를 삭제하지 않습니다.
// 세 번째 매개변수는 배열에 추가할 요소입니다. 이 매개변수는 선택적입니다.
    }
}
// event는 이벤트를 처리하는 함수에서 자동으로 전달되는 인자로, 이벤트에 대한 정보를 담고 있는 객체입니다. 이벤트에 따라 event 객체에 담긴 정보가 다르지만, 보통 이벤트가 발생한 요소, 이벤트의 타입, 마우스의 위치 등의 정보를 담고 있습니다. 이 정보를 활용하여 이벤트를 처리하거나 조작할 수 있습니다.

// target은 이벤트가 발생한 요소를 가리키는 속성입니다. 이벤트가 발생한 요소는 이벤트를 처리하는 함수 내에서 event.target을 통해 접근할 수 있습니다. 예를 들어, 클릭 이벤트가 발생한 버튼 요소의 target은 해당 버튼 자신이 됩니다. target을 사용하여 이벤트가 발생한 요소의 상태를 변경하거나, 이벤트를 발생시킨 요소에 대한 추가적인 동작을 수행할 수 있습니다.


function Add_no() {
    Add_reset();
}
function Add_reset() {
    index1 = 0;
    add_adr.style.display = 'none';
    adr_url.value = '';
    adr_id.value = '';
}

//웹실행히 먼저 로드되는 함수
window.onload = function() {
    // 로컬 스토리지에서 데이터 불러오기 getItem('저장이름')
    const data = JSON.parse(localStorage.getItem('maybe_ul'));
    
    // 데이터가 있다면 리스트에 추가
    if (data) {
        const items = data;
            for (let i = 0; i < items.length; i++) {
                let li = document.createElement('li');
                let a = document.createElement('a');                
                li.innerHTML = items[i].name;
                li.classList.add('maybe_li');
                a.target='_blank';
                a.href=items[i].url;
                a.appendChild(li);
                maybe_ul.appendChild(a);
            }//for -> 로컬스토리지에서 가져옴
            
            const a3 = document.querySelectorAll('.maybe_li');//6
            let index=a3.length-items.length;
            for(let i=0;i<items.length;i++){
                let bt = document.createElement('button'); // 버튼 생성
                bt.innerHTML = 'X';
                bt.classList.add('adr_del_bt');
                a3[index+i].appendChild(bt);// 버튼 추가
                bt.addEventListener('click',function(){
                    del_li(this,event);
                });
                
            }//for버튼삽입                

        // //추가된 모든 버튼에 함수 할당    
        // const adr_del_bt = document.querySelectorAll('.adr_del_bt');
        // adr_del_bt.forEach(bt => bt.addEventListener('click', del_li));
    }//if
     // 버튼 클릭 이벤트 등록
    
};

//function
//끝!
