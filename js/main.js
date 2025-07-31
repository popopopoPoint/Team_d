
$(function () {

    /*=================================================
     スムーススクロール
     ===================================================*/
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 1000, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });
    /*=================================================
     sectionタイトルのゆっくり出現
     ===================================================*/
    $(window).scroll(function () {
        // fadeinクラスに対して順に処理を行う
        $(".fadein").each(function () {
            // スクロールした距離
            let scroll = $(window).scrollTop();
            // fadeinクラスの要素までの距離
            let target = $(this).offset().top;
            // 画面の高さ
            let windowHeight = $(window).height();
            // fadeinクラスの要素が画面下にきてから200px通過した
            // したタイミングで要素を表示
            if (scroll > target - windowHeight + 200) {
                $(this).css("opacity", "1");
                $(this).css("transform", "translateY(0)");
            }
        });
    });

    /*=================================================
    ハンバーガー
    ===================================================*/

    $(".toggle_btn").on("click", function () {

        if ($("header").hasClass("open")) {

            $("header").removeClass("open");
        } else {

            $("header").addClass("open");
        }
    });


    $('nav a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        const target = $(href);

        if (!target.length) return; // 対象がなければ何もしない

        const headerHeight = $('header').outerHeight();
        const position = target.offset().top - headerHeight;

        if ($('header').hasClass('open')) {
            // ハンバーガーメニューが開いているとき → 即ジャンプ
            e.preventDefault();
            $('header').removeClass('open');

            // メニュー閉じた後に少し待ってからジャンプ（視覚的に安定）
            setTimeout(() => {
                window.scrollTo({
                    top: position,
                    behavior: 'auto' // ← スムースにしない
                });
            }, 300); // CSS transition のタイミングに合わせて調整可能
        } else {
            // 通常時 → スムーススクロール
            e.preventDefault();
            $('html, body').animate({ scrollTop: position }, 600);
        }
    });

});

/*=================================================
PICK UP スライダー
===================================================*/
$('.voice-slide-items').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  
    responsive: [
      {
        breakpoint: 768, // 画面幅が768px以下になったら
        settings: {
          slidesToShow: 1, // 1枚表示に変更
          slidesToScroll: 1,
        }
      }
    ]
  });
});
