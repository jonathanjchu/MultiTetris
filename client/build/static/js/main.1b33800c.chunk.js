(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(e,t,a){e.exports=a(86)},54:function(e,t,a){},77:function(e,t){},8:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(46),i=a.n(r),o=(a(54),a(2)),c=a(3),l=a(5),u=a(4),m=a(6),h=(a(8),a(18)),p=a(14),d=a(13),b=a.n(d),y=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"main_board"},this.props.board.map(function(t,a){return s.a.createElement("div",{className:"row",key:a},t.map(function(t,a){return s.a.createElement("div",{className:"block ".concat(e.props.colorKey[t]),key:a})}))}))}}]),t}(n.Component),f=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"mini_board"},s.a.createElement("h5",null,this.props.username),this.props.board.map(function(t,a){return s.a.createElement("div",{className:"row",key:a},t.map(function(t,a){return s.a.createElement("div",{className:"block ".concat(e.props.colorKey[t]),key:a})}))}))}}]),t}(n.Component),g=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"game_over"},s.a.createElement("h1",null,"GAME OVER"))}}]),t}(n.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"score_box"},s.a.createElement("h3",null,"Lines: ",this.props.lines))}}]),t}(n.Component),E=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){for(var e=[],t=0;t<this.props.shape.length;t++){for(var a=[],n=0;n<this.props.shape[t].length;n++)a.push("block "+this.props.colorKey[this.props.shape[t][n]]);e.push(a)}return s.a.createElement("div",{id:"next_piece"},s.a.createElement("h4",null,"Next:"),s.a.createElement("div",{className:"box"},e.map(function(e,t){return s.a.createElement("div",{className:"row",key:t},e.map(function(e,t){return s.a.createElement("div",{className:e,key:t})}))})))}}]),t}(n.Component),O=a(15),j=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).submitMessage=function(e){e.preventDefault(),a.state.message.length>0&&(a.props.onNewMessage(a.state.message),a.setState({message:""}))},a.onMessageChange=function(e){a.setState({message:e.target.value})},a.state={message:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("form",{onSubmit:this.submitMessage},s.a.createElement("input",{type:"text",onChange:this.onMessageChange,value:this.state.message}),s.a.createElement("input",{type:"submit",value:"Send"})))}}]),t}(n.Component),k=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e="chat_row";return this.props.isMyUsername&&(e+=" chat_highlight"),s.a.createElement("div",{className:e},s.a.createElement("span",{className:"chat_user"},this.props.username,":"),s.a.createElement("span",{className:"chat_msg"},this.props.message))}}]),t}(n.Component),S=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onNewMessage=function(e){a.state.socket.emit("send_new_message",{username:a.state.username,message:e});var t=Object(O.a)(a.state.messages);t.push({username:a.state.username,message:e,timestamp:Date.now()}),a.setState({messages:t})},a.state={endpoint:"18.222.83.43:54810/chat",socket:null,messages:[],username:a.props.username},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=b()(this.state.endpoint);t.on("get_all_messages",function(t){e.setState({messages:t.messages})}),t.on("receive_new_message",function(t){var a=Object(O.a)(e.state.messages);a.push({username:t.username,message:t.message,timestamp:t.timestamp}),e.setState({messages:a})}),this.setState({socket:t})}},{key:"componentWillUnmount",value:function(){this.state.socket.off(),this.state.socket.disconnect()}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{id:"chatroom"},this.state.messages.map(function(t,a){return s.a.createElement(s.a.Fragment,null,t.username===e.state.username?s.a.createElement(k,{key:a,username:t.username,message:t.message,isMyUsername:!0}):s.a.createElement(k,{key:a,username:t.username,message:t.message,isMyUsername:!1}))})),s.a.createElement(j,{onNewMessage:this.onNewMessage}))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).startGame=function(e){e.emit("start_game",{id:a.state.id}),document.addEventListener("keydown",a.onKeyPress),e.on("game_state",function(e){a.setState({gameState:e.gameState,isGameOver:!1})}),e.on("game_over",function(e){a.setState({isGameOver:!0}),document.removeEventListener("keydown",a.onKeyPress)})},a.onKeyPress=function(e){a.state.socket.emit("key_press",{keyCode:e.keyCode,id:a.state.id})},a.state={endpoint:"18.222.83.43:54810/tetris",id:a.props.match.params.id,socket:null,isGameOver:!1,gameState:null,messages:[],colorKey:["blank","blue","purple","green","orange","red","yellow","gray"]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=b()(this.state.endpoint);this.startGame(e),this.setState({socket:e})}},{key:"componentWillUnmount",value:function(){this.state.socket.emit("leave_game",{id:this.state.id}),this.state.socket.off(),this.state.socket.disconnect()}},{key:"render",value:function(){var e=this,t=[];try{for(var a in this.state.gameState)this.state.gameState.hasOwnProperty(a)&&a!==this.state.id&&t.push(this.state.gameState[a])}catch(n){console.log(n)}return s.a.createElement("div",null,s.a.createElement(h.b,{to:"/",className:"nav"},"Quit"),this.state.gameState?s.a.createElement("div",{id:"game"},s.a.createElement("h2",null,this.state.gameState[this.state.id].username),s.a.createElement("div",{id:"left_bar"},s.a.createElement("div",{id:"chat_bar"},s.a.createElement(S,{username:this.state.gameState[this.state.id].username})),s.a.createElement("div",{id:"instructions"},s.a.createElement("p",null,s.a.createElement("b",null,s.a.createElement("u",null,"How to play"))),s.a.createElement("p",null,s.a.createElement("b",null,"Rotate:")," Up"),s.a.createElement("p",null,s.a.createElement("b",null,"Move:")," Left, Right, Down"),s.a.createElement("p",null,s.a.createElement("b",null,"Drop:")," Space"),s.a.createElement("br",null),s.a.createElement("p",null,"Clearing 2 or more lines will give junk lines to your opponents"))),s.a.createElement(y,{board:this.state.gameState[this.state.id].board,colorKey:this.state.colorKey}),s.a.createElement("div",{id:"right_bar"},s.a.createElement(E,{shape:this.state.gameState[this.state.id].nextShape,colorKey:this.state.colorKey}),s.a.createElement(v,{lines:this.state.gameState[this.state.id].linesRemoved}),t.map(function(t,a){return s.a.createElement(f,{key:a,board:t.board,username:t.username,colorKey:e.state.colorKey})})),this.state.isGameOver?s.a.createElement(g,null):s.a.createElement(s.a.Fragment,null)):s.a.createElement("h1",null,"Loading..."))}}]),t}(n.Component),_=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).toggleReady=function(e){e.preventDefault(),a.props.onSetReady()},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e="lobby_row",t="";return this.props.isReady?(e+=" ready",t="Ready!"):(e+=" not_ready",t="Waiting..."),s.a.createElement("div",{className:e},s.a.createElement("h5",{className:"lobby_player"},this.props.username),this.props.isUser&&!this.props.isReady?s.a.createElement("button",{onClick:this.toggleReady},"Ready?"):s.a.createElement("p",{className:"lobby_status"},t))}}]),t}(n.Component),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).updateTime=function(){var e=a.state.timeRemaining;0===--e&&(clearInterval(a.state.timer),a.props.onCountDownFinish()),a.setState({timeRemaining:e})},a.state={timeRemaining:a.props.startTime,timer:null},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({timer:setInterval(this.updateTime,1e3)})}},{key:"render",value:function(){return s.a.createElement("div",{className:"countdown"},s.a.createElement("h1",null,"Starting in ",this.state.timeRemaining,"..."))}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).findUserAndSetToReady=function(e){for(var t=Object(O.a)(a.state.users),n=0;n<t.length;n++)t[n].username===e&&(t[n].isReady=!0);a.setState({users:t})},a.countDownFinish=function(){a.props.history.push("/tetris/".concat(a.state.id))},a.setReady=function(){a.state.socket.emit("player_set_ready",{username:a.state.username,id:a.state.id,ready:!0}),a.findUserAndSetToReady(a.state.username),a.setState({canSetReady:!1})},a.state={endpoint:"18.222.83.43:54810/lobby",socket:null,id:a.props.match.params.id,username:"",users:[],countDown:5,isStarting:!1,countDownTimer:null,canSetReady:!0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=b()(this.state.endpoint);t.emit("joining_lobby",{id:this.state.id}),t.on("confirm_join",function(t){console.log(t.username),console.log(t.allUsers),e.setState({username:t.username,users:t.allUsers})}),t.on("player_joined",function(t){var a=Object(O.a)(e.state.users);a.push({username:t.newuser,ready:!1}),e.setState({users:a})}),t.on("player_left",function(t){var a=Object(O.a)(e.state.users).filter(function(e){return e!==t.quitter});console.log("player_left:"+a),e.setState({users:a})}),t.on("player_ready",function(t){e.findUserAndSetToReady(t.username)}),this.setState({socket:t}),t.on("lobby_countdown",function(t){e.setState({isStarting:!0,countDown:t.countDown})})}},{key:"componentWillUnmount",value:function(){this.state.socket.off(),this.state.socket.disconnect()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"game"},s.a.createElement("h2",null,"Tetris"),s.a.createElement("div",{id:"left_bar"},s.a.createElement("div",{id:"chat_bar"},""!==this.state.username?s.a.createElement(S,{username:this.state.username}):s.a.createElement("p",null,"Loading..."))),s.a.createElement("div",{id:"right_bar"},s.a.createElement("h3",null,"Players"),this.state.users.map(function(t,a){return s.a.createElement(_,{key:a,username:t.username,id:t.id,isReady:t.isReady,isUser:t.username===e.state.username,onSetReady:e.setReady})}),s.a.createElement("p",{id:"instructions"},'Press "Ready?" when ready to play')),this.state.isStarting?s.a.createElement(C,{startTime:this.state.countDown,onCountDownFinish:this.countDownFinish}):s.a.createElement(s.a.Fragment,null))}}]),t}(n.Component),R=Object(p.f)(N),U=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onUserNameChange=function(e){var t=a.state.canSubmit,n="";e.target.value.length>0&&e.target.value.length<16?(t=!0,n=""):n="Username must be less than 16 characters",a.setState({username:e.target.value,canSubmit:t,message:n})},a.onUserNameSubmit=function(e){e.preventDefault();var t=b()(a.state.endpoint);t.emit("set_username",{username:a.state.username}),t.on("confirm_username",function(e){a.setState({message:""}),a.props.history.push("/lobby/".concat(e.id))}),t.on("username_used",function(e){a.setState({username:"",message:"Username already in use"})}),t.on("user_too_late",function(e){a.setState({message:"Game already started"})}),a.setState({socket:t})},a.state={endpoint:"18.222.83.43:54810/usernames",username:"",message:"",canSubmit:!1,socket:null},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillUnmount",value:function(){this.state.socket.off(),this.state.socket.disconnect()}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h3",null,this.state.message),s.a.createElement("form",{onSubmit:this.onUserNameSubmit},s.a.createElement("label",null,"Enter username: "),s.a.createElement("input",{type:"text",onChange:this.onUserNameChange,value:this.state.username}),s.a.createElement("input",{type:"submit",value:"Enter",disabled:!this.state.canSubmit})))}}]),t}(n.Component),D=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).onKeyPress=function(e){a.state.socket.emit("key_press",{keyCode:e.keyCode})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement(h.a,null,s.a.createElement(p.c,null,s.a.createElement(p.a,{exact:!0,path:"/",component:U}),s.a.createElement(p.a,{path:"/lobby/:id",component:R}),s.a.createElement(p.a,{path:"/tetris/:id",component:w})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[49,1,2]]]);
//# sourceMappingURL=main.1b33800c.chunk.js.map