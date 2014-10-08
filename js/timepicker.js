/**
 * @author qianlw
 * 
 * @date 2014-9-29
 * 
 * @update 2014-9-29 
 */

;(function($) {
	var defaults = {
		
	};
	
	$.fn.extend({
		timepicker: function(options) {
			var setting = $.extend({}, defaults, options);
			init(setting, this);
			return this;
		}
	});
	
	var init = function(setting, _this) {
		var top = _this.offset().top + _this.outerHeight(),
			left = _this.offset().left,
			html = createHtml(),
			CSS_SHOW = "show",
			CSS_SELECT = "select";
		
		$("body").append(html);
		
		var timepicker = $(".timepicker"),
			select = $(".timepicker-select"),
			texts = $(".timepicker-text"),
			lists = $(".timepicker-list"),
			time = $("#timepicker_time"),
			now = $("#timepicker_now"),
			ok = $("#timepicker_ok");
		
		timepicker.css({"top": top, "left": left});
		
		select.each(function(i) {
			var that = $(this);
			
			that.on("click", ".timepicker-input", function(event) {
				var list = lists.eq(i),
					flag = list.hasClass(CSS_SHOW);
				
				lists.removeClass(CSS_SHOW);
				if (!flag) {
					list.addClass(CSS_SHOW);
				}
				
				event.stopPropagation();
			});
			
			that.on("click", ".timepicker-option", function() {
				var text = $(this).text();
					arr = time.text().split(":");
				
				arr[i] = text;	
				$(this).addClass(CSS_SELECT).siblings(".timepicker-option").removeClass(CSS_SELECT);
				texts.eq(i).text(text);
				time.text(arr.join(":"));
				_this.val(arr.join(":"));
				lists.eq(i).removeClass(CSS_SHOW);
			});
		});
		
		_this.on("click focus", function(event){
			timepicker.addClass(CSS_SHOW);
			event.stopPropagation();
		});
		
		ok.on("click", function() {
			timepicker.removeClass(CSS_SHOW);
		});
		
		now.on("click", function() {
			var date = new Date(),
				hour = date.getHours(),
				minute = date.getMinutes();
			
			lists.eq(0).find(".timepicker-option").eq(hour).trigger("click");
			lists.eq(1).find(".timepicker-option").eq(minute).trigger("click");
		});
		
		$(document).on("click", function(event) {
			var target = $(event.target);
			
			if (!target.hasClass("timepicker") && target.parents(".timepicker").length === 0) {
				timepicker.removeClass(CSS_SHOW);
			}
			lists.removeClass(CSS_SHOW);
		});
	};
	
	var num2html = function(total) {
		var html = '';
		
		for (var i = 0; i < total; i++) {
			if ( i < 10) {
				html += "<li class=\"timepicker-option\">0" + i + "</li>";
			} else {
				html += "<li class=\"timepicker-option\">" + i + "</li>";
			}
		}
		
		return html;
	};
	
	var createHtml = function() {
		return "<div class=\"timepicker\">" 
			 + "	<p class=\"timepicker-title\">选择时间</p>"
			 + " 	<dl class=\"timepicker-row\">"
			 + "		<dt class=\"timepicker-label\">时间</dt>"
			 + "		<dd id=\"timepicker_time\" class=\"timepicker-time\">00:00</dd>"
			 + "	</dl>"
			 + "	<dl class=\"timepicker-row\">"
			 + "		<dt class=\"timepicker-label\">时</dt>"
			 + "		<dd class=\"timepicker-time\">"
			 + "			<dl class=\"timepicker-select\">"
			 + "				<dt class=\"timepicker-input\">"
			 + "					<span class=\"timepicker-text\">00</span>"
			 + "					<span class=\"timepicker-arrow\"></span>"
			 + "				</dt>"
			 + "				<dd class=\"timepicker-list\">"
			 + "					<ul>"
			 + 							num2html(24)
			 + "					</ul>"
			 + "				</dd>"
			 + "			</dl>"
			 + "		</dd>"
			 + "	</dl>"
			 + "	<dl class=\"timepicker-row\">"
			 + "		<dt class=\"timepicker-label\">分</dt>"
			 + "		<dd class=\"timepicker-time\">"
			 + "			<dl class=\"timepicker-select\">"
			 + "				<dt class=\"timepicker-input\">"
			 + "					<span class=\"timepicker-text\">00</span>"
			 + "					<span class=\"timepicker-arrow\"></span>"
			 + "				</dt>"
			 + "				<dd class=\"timepicker-list\">"
			 + "					<ul>"
			 + 							num2html(60)
			 + "					</ul>"
			 + "				</dd>"
			 + "			</dl>"
			 + "		</dd>"
			 + "	</dl>"
			 + "	<div class=\"timepicker-btnbox\">"
			 + "		<a id=\"timepicker_now\" class=\"timepicker-button timepicker-lbtn\" href=\"javascript:void(0);\">当前时间</a>"
			 + "		<a id=\"timepicker_ok\" class=\"timepicker-button timepicker-rbtn\" href=\"javascript:void(0);\">确定</a>"
			 + "	</div>"
			 + "</div>";
	};
	
})(jQuery);