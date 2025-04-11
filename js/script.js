document.addEventListener(`DOMContentLoaded`, function(){
    $(document).ready(function(){
        history.scrollRestoration = 'manual';
        // history.scrollRestoration = "auto";

        const $boxes = $('.ability_word .box');
        $boxes.each(function (index) {
            const $box = $(this);
            setTimeout(() => {
                $box.addClass('box-animate-in');
            }, index * 100); // 200ms 간격으로 순차 등장
        });

        //스와이퍼
        var swiper = new Swiper('.swiper', {

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },

            slidesPerView: 'auto', // 한번에 보여줄 슬라이드 수
            spaceBetween: 30,
        })

        // 이미지 회전효과
        $(window).scroll(function(){
            const height = $(window).scrollTop();
            let move = Math.min(height * 0.3, 300);  

            // console.log(height);
            
            $('.img_box').each(function(index){
                const $img = $(this);

                const baseAngle = parseFloat($img.data('angle')) || 0; // 초기각도 없으면 0

                const extraRotate = (move / 300) * 50; // height의 이동값만큼 회전할 량 정하기

                const direction = baseAngle > 180 ? -1 : 1; // 180도를 기준으로 회전방향 정함

                const totalRotate = baseAngle + (direction * extraRotate);

                $img.css({
                    transform: `translateY(${move}px) rotate(${totalRotate}deg)` 
                })
            })
        })


        // 애니메이션 효과
        let lastScrollY = 0;

        $(window).on('scroll', function () {
            const scrollY = $(window).scrollTop();          //현재 스크롤 위치
            const windowHeight = $(window).height();        //현재 홈페이지 화면의 높이
            const $target = $('.swiper_box');
            const $target2 = $('.portfolio_box');
            const targetTop = $target.offset().top;
            const targetTop2 = $target2.offset().top;
            // console.log(scrollY);


            const isScrollingDown = scrollY > lastScrollY;

            // 아래로 스크롤하고 요소가 보이면 slide-in 추가
            if (isScrollingDown && scrollY + windowHeight > targetTop + 100) {
                $target.addClass('slide-in');
            }

            // 위로 스크롤하고 요소가 다시 화면 위로 벗어나면 제거
            if (!isScrollingDown && scrollY + windowHeight < targetTop + 100) {
                $target.removeClass('slide-in');
            }
            if (isScrollingDown && scrollY + windowHeight > targetTop2 + 100) {
                $target2.addClass('slide-in');
            }

            // 위로 스크롤하고 요소가 다시 화면 위로 벗어나면 제거
            if (!isScrollingDown && scrollY + windowHeight < targetTop2 + 100) {
                $target2.removeClass('slide-in');
            }

            // 마지막 스크롤 위치 저장
            lastScrollY = scrollY;
        });

        // 특정 클래스 앞에 글자추가
        $('.tag_box p').prepend('# ');

        // 화면 넓이에따른 width값 주기
        function setWidthToViewport() {
            const vw = window.innerWidth;
            document.querySelector('.portfolio_box').style.width = vw + 'px';
        }
        
        window.addEventListener('resize', setWidthToViewport);
        setWidthToViewport();

        // 개수를 카운트해서 숫자넣어주는 기능
        $('.pf_box').each(function(index){
            const total = $('.pf_box').length;            // 전체 개수
            const current = index + 1;                    // 현재 순서 (0부터 시작하니까 +1)
            $(this).find('.number_count').text(`0${current}/`);
        });

        // 자식 호버했을때 부모 반응오게하기
        $('.pf_box').hover(
            function() {
              $(this).addClass('hovered');
            },
            function() {
              $(this).removeClass('hovered');
            }
          );
    })
})