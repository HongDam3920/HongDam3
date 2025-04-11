document.addEventListener(DOMContentLoaded, function(){
    $(document).ready(function(){
        //새로고침시 최상단 이동
        // history.scrollRestoration = "manual";
        $(window).on('beforeunload', function() {
            localStorage.setItem('scrollY', window.scrollY);
        });
        
        // 2. 위치 복원
        $(document).ready(function() {
            const savedY = localStorage.getItem('scrollY');
            if (savedY) {
                window.scrollTo(0, parseInt(savedY));
            }
        });

        //스와이퍼
        var swiper = new Swiper('.swiper', {

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },

            slidesPerView: 4, // 한번에 보여줄 슬라이드 수
            spaceBetween: 30,
        })

        //최상단이 아닐시 호버기능 제거
        $(window).scroll(function(){
            var scrollValue = $(window).scrollTop();
            if(scrollValue != 0){
                $('.box').removeClass('hover1');
            }
            else{
                $('.box').addClass('hover1');  
            }
        })

        // 처음 왼쪽위치 저장
        let initLefts = [];

        let $boxes = $('.box');
        $boxes.each(function(index){
            let $box = $(this);
            let init_left = $box.offset().left;
            initLefts[index] = init_left;
        })
        
        //챗gpt 활용부분
        //애니메이션 적용부분
        $(window).scroll(function() {
            let h = $(window).scrollTop();
            console.log(h);
            
            let triggerStart = 1200;

            let $boxes = $('.box');
            let total = $boxes.length;
            let centerTop = window.innerHeight / 2;
            let centerLeft = window.innerWidth / 2;
            let mid = (total - 1) / 2;
            
            let $text = $('.box_in_p');
            let $span = $('.box_in_span');
            
            // 1 = a * 100 + b
            // 0 = a * 500 + b
            // y = a * 높이 + b
            // 높이 100에서 500구간
            // 문자 투명도 조절
            var removey = (-0.0025) * h + 1.25;
            removey = Math.max(0, Math.min(removey, 1)); // 0 ~ 1로 제한

            $text.css('color', rgba(255,255,0,${removey}));

            // 문자 크기 조절
            // 높이 300에서 700구간
            // 100폰트에서 220폰트까지
            if (h >= 300) {
                let resizey = 0.3 * h + 10;
                resizey = Math.min(resizey, 220); // 최대 글자 크기 제한
                $span.css('font-size', resizey + 'px');
            } else {
                $span.css('font-size', ''); // 초기화
            }

            console.log($('.box').offset().top)
            // console.log($('.ability_word').offset().top)
            // console.log($('.assistance_title').offset().top)

            // 높이 800에서 스타트
            // 박스들이 중앙으로 정렬되는 부분
            $boxes.each(function(index){
                let $box = $(this);

                const fixed_point = ['90','-150','-90','140','230','0','-20'];
                const init_top = ['100','263.200','426.399','589.600','752.799','916','1036'];
                const init_left = initLefts[index];

                // 초기 위치 저장
                // if (!$box.data('fixed-top')) {
                //     $box.data('fixed-top', $box.offset().top - h);
                //     $box.data('fixed-left', $box.offset().left - $(window).scrollLeft());
                //     console.log($box.data('fixed-top'));
                // }

                // 중앙으로 이동 준비
                if (h >= triggerStart && !$box.hasClass('fixed-on')) {
                    let initialTop = init_top[index];
                    let initialLeft = init_left;

                    // 1. position: fixed로 고정 + 위치 초기화
                    $box.css({
                        position: 'fixed',
                        top: initialTop + 'px',
                        left: initialLeft + 'px'
                    });
                
                    // 3. 위치 이동
                    setTimeout(() => {
                        let offsetX = (index - mid) * 140;
                
                        $box.css({
                            top: ((centerTop - $box.outerHeight() / 2) + 250) + 'px',
                            left: ((centerLeft + offsetX - $box.outerWidth() / 2) - fixed_point[index] ) + 'px'
                        });

                        $box.addClass('fixed-on');

                        $('.assistance_title').css({
                            opacity : '1',
                            transition : '1s',
                        });

                    }, 300);
                }
            
                // 복귀
                if (h < triggerStart && $box.hasClass('fixed-on')) {
                    let originalTop = init_top[index];
                    let originalLeft = init_left;

                    $box.find('.box_in_span').removeClass('moving');
                    $box.find('.moving').css('left', '');

                    $('.assistance_title').css({
                        opacity : '',
                    });

                    // 1. 위치 먼저 복귀
                    $box.css({
                        top: originalTop + 'px',
                        left: originalLeft + 'px'
                    });
            
            
                    // 3. 모두 리셋
                    setTimeout(() => {
                        $box.css({
                            position: '',
                            top: '',
                            left: '',
                            transform: '',
                            zIndex: '',
                            // transition: '',
                        }).removeClass('fixed-on')
                        .removeData('fixed-top')
                        .removeData('fixed-left');
                    }, 1000);
                }

                if (h >= 1500){
                    $('.ability_word').css({
                        position: 'absolute',
                        top: '1600px',
                    }).addClass('fixed-ended');

                    // $box.css({
                    //     position: 'absolute',
                    // }).addClass('fixed-ended');

                    // $('.assistance_title').css({
                    //     position: 'absolute',
                    // }).addClass('fixed-ended');
                }else if(h > 1300 && h < 1500){
                    $('.ability_word').css({
                        position: '',
                        top: '',
                    }).removeClass('fixed-ended');
                    $box.css({
                    }).removeClass('fixed-ended');
                    $('.assistance_title').css({
                        position: '',
                    }).removeClass('fixed-ended');
                }
            });
        }); 
    })
})