(function(){
   window.PageNav = PageNav;
   function PageNav(params){
        this.$box = $("#" + params.boxid);
        this.page = params.page || 1;
        this.pageAmount = params.pageAmount;
        this.flag = false;
 
        //get delegate functions；
        this.fn = params.change;
        this.init();
        this.gotoPage(this.page);
        this.bindEvent();
   };
   PageNav.prototype.init = function(){
        this.$prevBtn = $("<a href='javascript:;'></a>").addClass("cBtn").html("上一页").appendTo(this.$box);
        this.$btn1 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$ellipsis1 = $("<a href='javascript:;'></a>").addClass("ellipsis").html("...").appendTo(this.$box);
        this.$btn2 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn3 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn4 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn5 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn6 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$ellipsis2 = $("<a href='javascript:;'></a>").addClass("ellipsis").html("...").appendTo(this.$box);
        this.$btn7 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$nextBtn = $("<a href='javascript:;'></a>").addClass("cBtn").html("下一页").appendTo(this.$box);
   };
   PageNav.prototype.gotoPage = function(number){
        
         if(number >= 1 && number <= this.pageAmount){
            this.page = number;
        };
        if(this.pageAmount <= 7){
            
            this.$ellipsis1.hide();
            this.$ellipsis2.hide();
            //hide and show for last or next
            if(this.page == 1){
                this.$prevBtn.hide();
                this.$nextBtn.show();
            }else if( this.page == this.pageAmount){
                this.$prevBtn.show();
                this.$nextBtn.hide();
            }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
            };
           
            this.$box.find(".Btn:lt("+this.pageAmount+")").show();
            this.$box.find(".Btn:gt("+(this.pageAmount - 1)+")").hide();
            this.$btn1.html(1).attr("data-number",1);
            this.$btn2.html(2).attr("data-number",2);
            this.$btn3.html(3).attr("data-number",3);
            this.$btn4.html(4).attr("data-number",4);
            this.$btn5.html(5).attr("data-number",5);
            this.$btn6.html(6).attr("data-number",6);
            this.$btn7.html(7).attr("data-number",7);
            //current page cur；
            this.$box.find(".Btn").eq(this.page-1).addClass("cur").siblings(".Btn").removeClass('cur');
        }else if( this.page < 5 ){
            
             this.$ellipsis1.hide();
             this.$ellipsis2.show();
            
             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.show().html(2).attr("data-number",2);
             this.$btn3.show().html(3).attr("data-number",3);
             this.$btn4.show().html(4).attr("data-number",4);
             this.$btn5.show().html(5).attr("data-number",5);
             this.$btn6.show().html(6).attr("data-number",6);
             this.$btn7.show().html(this.pageAmount).attr("data-number",this.pageAmount);
             
             this.$box.find(".Btn").eq(this.page-1).addClass("cur").siblings(".Btn").removeClass('cur');;
            
             if( this.page == 1){
                this.$prevBtn.hide();
                this.$nextBtn.show();
             }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
             };
        }else if( this.page <= this.pageAmount - 4 ){
             this.$ellipsis1.show();
             this.$ellipsis2.show();

             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.show().html(this.page-2).attr("data-number",this.page-2);
             this.$btn3.show().html(this.page-1).attr("data-number",this.page-1);
             this.$btn4.show().html(this.page).attr("data-number",this.page);
             this.$btn5.show().html(this.page+1).attr("data-number",this.page+1);
             this.$btn6.show().html(this.page+2).attr("data-number",this.page+2);
             this.$btn7.show().html(this.pageAmount).attr("data-number",this.pageAmount);

            this.$prevBtn.show();
            this.$nextBtn.show();

            this.$box.find(".Btn").eq(3).addClass("cur").siblings(".Btn").removeClass('cur');;
        }else{

             this.$ellipsis1.show();
             this.$ellipsis2.hide();
            
             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.hide();
             this.$btn3.html(this.pageAmount-4).attr("data-number",this.pageAmount-4);
             this.$btn4.html(this.pageAmount-3).attr("data-number",this.pageAmount-3);
             this.$btn5.html(this.pageAmount-2).attr("data-number",this.pageAmount-2);
             this.$btn6.html(this.pageAmount-1).attr("data-number",this.pageAmount-1);
             this.$btn7.html(this.pageAmount).attr("data-number",this.pageAmount);
             
             this.$box.find(".Btn").eq(this.page-this.pageAmount-1).addClass('cur').siblings(".Btn").removeClass('cur');;
             
             if(this.page == this.pageAmount){
                this.$prevBtn.show();
                this.$nextBtn.hide();
             }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
             }
        };
        //after request ,set this.flag=true, excute delegete function
        if(this.flag){
            this.fn(this.page);
        };
        this.flag = true;

      
   };
   PageNav.prototype.bindEvent = function(){
    var self = this;
        $(".Btn").click(function(){
            var i = parseInt($(this).attr("data-number"));
                self.gotoPage(i);
        });
        this.$prevBtn.click(function(){
            var i = self.page - 1;
            self.gotoPage(i);
        });
        this.$nextBtn.click(function(){
            var i = self.page + 1;
            self.gotoPage(i);
        });
   };
})();