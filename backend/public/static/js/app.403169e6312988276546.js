webpackJsonp([1],{"0PZY":function(t,e){},"5TKF":function(t,e){},CxoW:function(t,e){},"J++4":function(t,e){},LALV:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view"),this._v(" "),e("div",{attrs:{id:"footer"}},[this._v("Copyrightⓒ 2021 All rights reserved by OpenNAS Dev.")])],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App",created:function(){this.$session.has("auth")||this.$session.set("auth",null)}},r,!1,function(t){n("J++4")},null,null).exports,s=n("/ocq"),i=n("Xxa5"),l=n.n(i),c=n("exGp"),u=n.n(c),d=n("mtWM"),p=n.n(d),f={name:"Init",props:["data"],data:function(){return{valid:null,form:{host:"",port:"",db:"",db_root_user:"",db_root_password:"",db_onas_user:"open_nas",db_onas_password:""},dbEngine:[{label:"MySQL(MariaDB)",value:"mysql",key:"mysql"}],loadingText:""}},created:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{onSubmit:function(){var t=this;return u()(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.form),t.loadingText="기본설정 파일 생성까지 성능에 따라 약 1~5분정도 소요됩니다.",n=t.$loading({lock:!0,text:t.loadingText,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),e.next=5,p.a.post("/api/init/install",{form:t.form}).then(function(e){console.log(e),t.$router.go()}).catch(function(t){console.error(t)});case 5:setTimeout(function(){n.close()},2e3);case 6:case"end":return e.stop()}},e,t)}))()},onAbort:function(){}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"init"}},[n("el-card",{staticClass:"box-card"},[n("div",{attrs:{id:"header"}},[t._v("OpenNAS 설치")]),t._v(" "),n("div",{attrs:{id:"contents"}},[n("el-main",[n("el-form",{ref:"form",attrs:{model:t.form,"status-icon":"",rules:t.form,"label-width":"140px"}},[n("el-form-item",{attrs:{label:"DB 서버 주소",prop:"host"}},[n("el-input",{model:{value:t.form.host,callback:function(e){t.$set(t.form,"host",e)},expression:"form.host"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 서버 포트",prop:"port"}},[n("el-input",{model:{value:t.form.port,callback:function(e){t.$set(t.form,"port",e)},expression:"form.port"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 종류",prop:"db"}},[n("el-select",{attrs:{placeholder:"DB를 선택해주세요"},model:{value:t.form.db,callback:function(e){t.$set(t.form,"db",e)},expression:"form.db"}},t._l(t.dbEngine,function(t){return n("el-option",{key:t.key,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 관리자 계정",prop:"db_root_user"}},[n("el-input",{model:{value:t.form.db_root_user,callback:function(e){t.$set(t.form,"db_root_user",e)},expression:"form.db_root_user"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 관리자 비밀번호",prop:"db_root_password"}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.db_root_password,callback:function(e){t.$set(t.form,"db_root_password",e)},expression:"form.db_root_password"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 사용자 계정",prop:"db_onas_user"}},[n("el-input",{attrs:{disabled:""},model:{value:t.form.db_onas_user,callback:function(e){t.$set(t.form,"db_onas_user",e)},expression:"form.db_onas_user"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"DB 사용자 비밀번호",prop:"db_onas_password"}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.db_onas_password,callback:function(e){t.$set(t.form,"db_onas_password",e)},expression:"form.db_onas_password"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("저장")]),t._v(" "),n("el-button",{on:{click:t.onAbort}},[t._v("취소")])],1)],1)],1)],1)])],1)},staticRenderFns:[]};var v={name:"Login",components:{},data:function(){return{id:null,pass:null}},created:function(){var t=this;return u()(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:null!=(n=t.$session.get("auth"))&&n.result&&t.$router.push({name:"FileList"});case 2:case"end":return e.stop()}},e,t)}))()},methods:{onLogin:function(){var t=this;return u()(l.a.mark(function e(){var n,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n="/api/auth/login?USER_ID="+t.id+"&PASSWORD="+t.pass,e.next=3,p.a.get(n);case 3:a=e.sent,console.log(a),a.data.result?(t.$session.set("auth",a.data),t.$router.push({name:"FileList"})):t.$message.warning("계정이 일치하지 않습니다.");case 6:case"end":return e.stop()}},e,t)}))()}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("el-card",[n("label",[t._v("OpenNAS Login")]),t._v(" "),n("el-form",{ref:"form",attrs:{"label-width":"90px"}},[n("el-form-item",{attrs:{label:"ID:"}},[n("el-input",{staticStyle:{width:"150px"},attrs:{size:"mini"},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Password:"}},[n("el-input",{staticStyle:{width:"150px"},attrs:{type:"password",size:"mini"},model:{value:t.pass,callback:function(e){t.pass=e},expression:"pass"}})],1)],1),t._v(" "),n("div",{staticClass:"button"},[n("el-button",{attrs:{type:"primary"},on:{click:t.onLogin}},[t._v("Login")]),t._v(" "),n("el-button",{attrs:{type:"warning"}},[t._v("Register")])],1)],1)],1)},staticRenderFns:[]};var b={name:"Main",components:{Init:n("VU/8")(f,m,!1,function(t){n("CxoW")},"data-v-4f1336b1",null).exports,Login:n("VU/8")(v,_,!1,function(t){n("LALV")},"data-v-281ade3b",null).exports},data:function(){return{validData:{data:null,valid:null}}},created:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.validInstall();case 2:case"end":return e.stop()}},e,t)}))()},methods:{getFileList:function(){p.a.get("/api/files/getList").then(function(t){console.log("response = ",t)}).catch(function(t){console.log("err = ",t)})},validInstall:function(){var t=this;p.a.get("/api/init/validInstall").then(function(e){console.log(e),t.validData=e.data}).catch(function(t){console.error(t)})}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.validData.valid?e("div",[e("login")],1):e("div",{attrs:{id:"install"}},[e("Init",{attrs:{data:this.validData.data}})],1)])},staticRenderFns:[]};var g=n("VU/8")(b,h,!1,function(t){n("5TKF")},"data-v-1e576c37",null).exports,x=(n("H9QG").DateTime,{name:"FileList",components:{},data:function(){return{drawer:!1,direction:"rtl",fileList:[{FILE_KEY:1,FILE_ORI_NM:"파일 테스트.txt",FILE_SAVE_NM:"a1524ef",SIZE:14,EXT:".txt",UPLOAD_DATE:(new Date).toISOString()}],uploadList:[],api:"/api/files/upload"}},created:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.validSession();case 2:if(e.sent){e.next=6;break}return t.$router.push({name:"Main"}),e.abrupt("return");case 6:return e.next=8,t.getFileList();case 8:t.api+="?USER_NUM="+t.$session.get("auth").ACCOUNT.USER_NUM;case 9:case"end":return e.stop()}},e,t)}))()},methods:{validSession:function(){return null!=this.$session.get("auth")},getFileList:function(){p.a.get("/api/files/getList").then(function(t){console.log("getFileList = ",t)}).catch(function(t){console.log("err = ",t)})},handleClose:function(t){var e=this;this.$confirm("파일 업로드를 종료하시겠습니까?",{confirmButtonText:"확인",cancelButtonText:"취소"}).then(function(n){e.uploadList=[],t()}).catch(function(t){})},handleRemove:function(t,e){console.log(t,e)}}}),w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("div",{attrs:{id:"content"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.drawer=!0}}},[t._v("파일 업로드")]),t._v(" "),n("el-drawer",{attrs:{title:"파일 업로드",visible:t.drawer,direction:t.direction,"before-close":t.handleClose,size:"20%"},on:{"update:visible":function(e){t.drawer=e}}},[n("div",{staticClass:"uploadField"},[n("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:t.api,"on-remove":t.handleRemove,"file-list":t.uploadList,multiple:""}},[n("i",{staticClass:"el-icon-upload"}),t._v(" "),n("div",{staticClass:"el-upload__text"},[t._v("\n            Drop file here or "),n("em",[t._v("click to upload")])])])],1)]),t._v(" "),n("el-main",[n("el-table",{attrs:{data:t.fileList}},[n("el-table-column",{attrs:{prop:"FILE_ORI_NM",label:"파일명"}}),t._v(" "),n("el-table-column",{attrs:{prop:"EXT",label:"확장자"}}),t._v(" "),n("el-table-column",{attrs:{prop:"SIZE",label:"Size"}}),t._v(" "),n("el-table-column",{attrs:{prop:"UPLOAD_DATE",label:"업로드 일자"}})],1)],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"header"}},[e("label",[this._v("OpenNAS")])])}]};var L=n("VU/8")(x,w,!1,function(t){n("0PZY")},"data-v-7bbc03ed",null).exports;a.default.use(s.a);var k=new s.a({mode:"history",routes:[{path:"/",name:"Main",component:g},{path:"/fileList",name:"FileList",component:L}]}),$=n("zL8q"),D=n.n($),E=(n("tvR6"),n("18Sv")),S=n.n(E);a.default.use(S.a,{persist:!0}),a.default.use(D.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:k,components:{App:o},template:"<App/>"})},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.403169e6312988276546.js.map