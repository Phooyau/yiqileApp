
(function () {
    function PyScroll(box, config) {
        this.$ul = $(box);
        this.$li = $("li", box);
        this.dots = config.dots
        this.nowing = 0;
        this.len = this.$li.length; //图片个数
        this.liWin = 15;
        this.initLeft = -15;
        this.winW = screen.width;
        this.touch = {};
        this.loop = false; // 是否自动轮播
    }

    $.extend(PyScroll.prototype, {
        init: function () {
            var $ul = this.$ul;
            var $li = this.$li;
            var len = this.len;
            $li.eq(0).clone().appendTo($ul);
            $li.eq(1).clone().appendTo($ul);
            $li.eq(len - 1).clone().prependTo($ul);

            this.bind_event();
            if (this.loop) {
                this.excuteLoop();
            }

        },
        bind_event: function () {
            var self = this;

            var $ul = this.$ul;
            var $li = this.$li;
            var dots = this.dots;
            var winW = this.winW;
            var initLeft = this.initLeft;
            var liWin = this.liWin;

            // 圆点点击事件
            dots.click(function () {
                self.nowing = $(this).index();
                $ul.animate({"left": initLeft + self.nowing * -liWin + "rem"}, 600);
                dots.eq(self.nowing).addClass("cur").siblings().removeClass("cur");
            });

            // touch事件
            $li.on('touchstart', function (e) {
                console.log(e);
                self.touch.pageX = e.touches[0].pageX;
                self.touch.left = parseFloat($ul.css('left'));
                console.log(self.touch.left);
            });

            $li.on('touchmove', function (e) {
                // console.log(e);
                self.touch.deltaX = e.touches[0].pageX - self.touch.pageX;
                $ul.css({
                    "left": self.touch.left + self.touch.deltaX
                }, 600);
            });

            $li.on('touchend', function (e) {
                console.log(e);
                if (self.touch.deltaX > winW / 5) {
                    self.prev();
                } else if (self.touch.deltaX < -winW / 5) {
                    self.next();
                } else {
                    $ul.animate({
                        "left": self.touch.left
                    }, 600);
                }
            });
        },
        prev: function () {
            var self = this;

            var $ul = this.$ul;
            var dots = this.dots;
            var len = this.len;
            var liWin = this.liWin;
            var initLeft = this.initLeft;

            if (self.nowing > 0) {
                self.nowing--;
                $ul.animate({"left": initLeft + self.nowing * -liWin + "rem"}, 600);

            } else {
                self.nowing = len - 1;
                $ul.css("left", initLeft + len * -liWin + "rem");
                $ul.animate({"left": initLeft + self.nowing * -liWin + "rem"}, 600);
            }
            dots.eq(self.nowing).addClass("cur").siblings().removeClass("cur");
        },
        next: function () {
            var self = this;

            var $ul = this.$ul;
            var dots = this.dots;
            var len = this.len;
            var liWin = this.liWin;
            var initLeft = this.initLeft;
            if (self.nowing < len - 1) {
                self.nowing++;
                $ul.animate({"left": initLeft + self.nowing * -liWin + "rem"}, 600);

            } else {
                self.nowing = 0;
                $ul.animate({"left": initLeft + len * -liWin + "rem"}, 600, function () {
                    $(this).css("left", initLeft + "rem");
                });
            }
            dots.eq(self.nowing).addClass("cur").siblings().removeClass("cur");
        },
        excuteLoop: function () {
            var self = this;
            var selfFunc = this.excuteLoop;
            self.timer = setTimeout(function () {
                self.next();
                clearTimeout(self.timer);
                selfFunc();
            }, 3000);
        }
    });

    $.fn.pyCarousel = function (config) {
        var box = this;
        var defaults = {
            dots: $(box).next().find('span')
        };
        config = $.extend({}, defaults, config);
        var pyScorll = new PyScroll(box, config);
        pyScorll.init();
        console.log(pyScorll);
    }
})();