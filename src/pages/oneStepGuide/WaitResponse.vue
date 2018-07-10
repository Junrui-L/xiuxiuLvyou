<template>
  <div class="wait_response">
    <HeadTop go-back='true' :headBg="headBg" headTitle="等待应答...">
      <div slot="message" class="message"></div>
    </HeadTop>
    <div class="tip-txt">正在为您通知附近向导...</div>
    <TimeCountUp :startTime="callData.createTime" countText="接单已等待"  :countCallback="endLog"/>
    <div class="custom-info">
      <div class="info-wrapper">
        <h3 class="info-tit">订单信息</h3>
        <ul class="info-list">
          <li class="info-item">游玩地址 <span class="fr">{{scienSopt.name}}</span></li>
          <li class="info-item">游玩时间

            <span v-if="callData.godate != endate" class="fr">{{callData.godate}}至{{endate}}</span>
            <span v-else class="fr">{{endate}}</span>

          </li>
          <li class="info-item">游玩人数 <span class="fr">{{callData.tripsnum}}人</span></li>
          <li class="info-item">向导类型 <span class="fr">{{callData.sourceType == 1 ? '景导' : '专导'}}</span></li>
          <li class="info-item">是否团游 <span class="fr">{{callData.istuan == 1 ? '是' : '否'}}</span></li>
          <li class="info-item" v-if="callData.sourceType == 2">捎话内容 <span class="fr">幽默开朗、女、可带车接幽默开朗、女、可带车接幽默开朗、女、可带车接幽默开朗、女、可带车接</span>
          </li>
        </ul>
      </div>
      <div class="another clearfix">10元
        <button class="cancel-btn fr"  @click="cancelGuide">取消呼叫</button>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import HeadTop from '../../components/HeadTop.vue'
  import TimeCountUp from  '../../components/timeCountUp.vue'
  import {onkeyCallGuide, onkeyCancelGuide} from '../../http/getDate'
  import {dateFmt, localStore} from '../../config/myUtils'
  import  '../../assets/lib/jquery-2.1.4.min.js'
  import  {org} from '../../http/amq_jquery_adapter.js'
  // import '../../http/amq.js'

  let callInfo = localStore('callInfo', 'localStorage');
  let UserInfo = localStore('userInfo', 'localStorage');
  org.activemq.Amq = function() {
    var connectStatusHandler;

    // Just a shortcut to eliminate some redundant typing.
    var adapter = org.activemq.AmqAdapter;

    if (typeof adapter == 'undefined') {
      throw 'An org.activemq.AmqAdapter must be declared before the amq.js script file.'
    }

    // The URI of the AjaxServlet.
    var uri;

    // The number of seconds that the long-polling socket will stay connected.
    // Best to keep this to a value less than one minute.
    var timeout;

    // A session should not be considered initialized until the JSESSIONID is returned
    // from the initial GET request.  Otherwise subscription POSTS may register the
    // subscription with the wrong session.
    var sessionInitialized = false;

    // This callback will be called after the first GET request returns.
    var sessionInitializedCallback;

    // Poll delay. if set to positive integer, this is the time to wait in ms
    // before sending the next poll after the last completes.
    var pollDelay;

    // Inidicates whether logging is active or not. Not by default.
    var logging = false;

    // 5 second delay if an error occurs during poll. This could be due to
    // server capacity problems or a timeout condition.
    var pollErrorDelay = 5000;

    // Map of handlers that will respond to message receipts. The id used during
    // addListener(id, destination, handler) is used to key the callback
    // handler.
    var messageHandlers = {};

    // Indicates whether an AJAX post call is in progress.
    var batchInProgress = false;

    // A collection of pending messages that accumulate when an AJAX call is in
    // progress. These messages will be delivered as soon as the current call
    // completes. The array contains objects in the format { destination,
    // message, messageType }.
    var messageQueue = [];

    // String to distinguish this client from others sharing the same session.
    // This can occur when multiple browser windows or tabs using amq.js simultaneously.
    // All windows share the same JESSIONID, but need to consume messages independently.
    var clientId = null;

    /**
     * Iterate over the returned XML and for each message in the response,
     * invoke the handler with the matching id.
     */
    var messageHandler = function(data) {
      var response = data.getElementsByTagName("ajax-response");
      if (response != null && response.length == 1) {
        connectStatusHandler(true);
        var responses = response[0].childNodes;    // <response>
        for (var i = 0; i < responses.length; i++) {
          var responseElement = responses[i];

          // only process nodes of type element.....
          if (responseElement.nodeType != 1) continue;

          var id = responseElement.getAttribute('id');

          var handler = messageHandlers[id];

          if (logging && handler == null) {
            adapter.log('No handler found to match message with id = ' + id);
            continue;
          }

          // Loop thru and handle each <message>
          for (var j = 0; j < responseElement.childNodes.length; j++) {
            handler(responseElement.childNodes[j]);
          }
        }
      }
    };

    var errorHandler = function(xhr, status, ex) {
      connectStatusHandler(false);
      if (logging) adapter.log('Error occurred in ajax call. HTTP result: ' +
        xhr.status + ', status: ' + status);
    }

    var pollErrorHandler = function(xhr, status, ex) {
      connectStatusHandler(false);
      if (status === 'error' && xhr.status === 0) {
        if (logging) adapter.log('Server connection dropped.');
        setTimeout(function() { sendPoll(); }, pollErrorDelay);
        return;
      }
      if (logging) adapter.log('Error occurred in poll. HTTP result: ' +
        xhr.status + ', status: ' + status);
      setTimeout(function() { sendPoll(); }, pollErrorDelay);
    }

    var pollHandler = function(data) {
      try {
        messageHandler(data);
      } catch(e) {
        if (logging) adapter.log('Exception in the poll handler: ' + data, e);
        throw(e);
      } finally {
        setTimeout(sendPoll, pollDelay);
      }
    };

    var initHandler = function(data) {
      sessionInitialized = true;
      if(sessionInitializedCallback) {
        sessionInitializedCallback();
      }
      sendPoll();
    }

    var sendPoll = function() {
      // Workaround IE6 bug where it caches the response
      // Generate a unique query string with date and random
      var now = new Date();
      var timeoutArg = sessionInitialized ? timeout : 0.001;
      var data = 'timeout=' + timeoutArg * 1000
        + '&d=' + now.getTime()
        + '&r=' + Math.random();
      var successCallback = sessionInitialized ? pollHandler : initHandler;

      var options = { method: 'get',
        data: addClientId( data ),
        success: successCallback,
        error: pollErrorHandler};
      adapter.ajax(uri, options);
    };

    var sendJmsMessage = function(destination, message, type, headers) {
      var message = {
        destination: destination,
        message: message,
        messageType: type
      };
      // Add message to outbound queue
      if (batchInProgress) {
        messageQueue[messageQueue.length] = {message:message, headers:headers};
      } else {
        org.activemq.Amq.startBatch();
        adapter.ajax(uri, { method: 'post',
          data: addClientId( buildParams( [message] ) ),
          error: errorHandler,
          headers: headers,
          success: org.activemq.Amq.endBatch});
      }
    };

    var buildParams = function(msgs) {
      var s = [];
      for (var i = 0, c = msgs.length; i < c; i++) {
        if (i != 0) s[s.length] = '&';
        s[s.length] = ((i == 0) ? 'destination' : 'd' + i);
        s[s.length] = '=';
        s[s.length] = msgs[i].destination;
        s[s.length] = ((i == 0) ? '&message' : '&m' + i);
        s[s.length] = '=';
        s[s.length] = msgs[i].message;
        s[s.length] = ((i == 0) ? '&type' : '&t' + i);
        s[s.length] = '=';
        s[s.length] = msgs[i].messageType;
      }
      return s.join('');
    }

    // add clientId to data if it exists, before passing data to ajax connection adapter.
    var addClientId = function( data ) {
      var output = data || '';
      if( clientId ) {
        if( output.length > 0 ) {
          output += '&';
        }
        output += 'clientId='+clientId;
      }
      return output;
    }
    console.log('amq运行了')
    return {
      // optional clientId can be supplied to allow multiple clients (browser windows) within the same session.
      init : function(options) {
        connectStatusHandler = options.connectStatusHandler || function(connected){};
        uri = options.uri || '/amq';
        pollDelay = typeof options.pollDelay == 'number' ? options.pollDelay : 0;
        timeout = typeof options.timeout == 'number' ? options.timeout : 25;
        logging = options.logging;
        sessionInitializedCallback = options.sessionInitializedCallback
        clientId = options.clientId;
        adapter.init(options);
        sendPoll();

      },

      startBatch : function() {
        batchInProgress = true;
      },

      endBatch : function() {
        if (messageQueue.length > 0) {
          var messagesToSend = [];
          var messagesToQueue = [];
          var outgoingHeaders = null;

          // we need to ensure that messages which set headers are sent by themselves.
          // if 2 'listen' messages were sent together, and a 'selector' header were added to one of them,
          // AMQ would add the selector to both 'listen' commands.
          for(i=0;i<messageQueue.length;i++) {
            // a message with headers should always be sent by itself.	if other messages have been added, send this one later.
            if ( messageQueue[ i ].headers && messagesToSend.length == 0 ) {
              messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
              outgoingHeaders = messageQueue[ i ].headers;
            } else if ( ! messageQueue[ i ].headers && ! outgoingHeaders ) {
              messagesToSend[ messagesToSend.length ] = messageQueue[ i ].message;
            } else {
              messagesToQueue[ messagesToQueue.length ] = messageQueue[ i ];
            }
          }
          var body = buildParams(messagesToSend);
          messageQueue = messagesToQueue;
          org.activemq.Amq.startBatch();
          adapter.ajax(uri, {
            method: 'post',
            headers: outgoingHeaders,
            data: addClientId( body ),
            success: org.activemq.Amq.endBatch,
            error: errorHandler});
        } else {
          batchInProgress = false;
        }
      },

      // Send a JMS message to a destination (eg topic://MY.TOPIC).  Message
      // should be xml or encoded xml content.
      sendMessage : function(destination, message) {
        sendJmsMessage(destination, message, 'send');
      },

      // Listen on a channel or topic.
      // handler must be a function taking a message argument
      //
      // Supported options:
      //  selector: If supplied, it should be a SQL92 string like "property-name='value'"
      //            http://activemq.apache.org/selectors.html
      //
      // Example: addListener( 'handler', 'topic://test-topic', function(msg) { return msg; }, { selector: "property-name='property-value'" } )
      addListener : function(id, destination, handler, options) {
        messageHandlers[id] = handler;
        var headers = options && options.selector ? {selector:options.selector} : null;
        sendJmsMessage(destination, id, 'listen', headers);
      },

      // remove Listener from channel or topic.
      removeListener : function(id, destination) {
        messageHandlers[id] = null;
        sendJmsMessage(destination, id, 'unlisten');
      },

      // for unit testing
      getMessageQueue: function() {
        return messageQueue;
      },
      testPollHandler: function( data ) {
        return pollHandler( data );
      }
    };

  }();
  export default {
    name: "wait-response",
    data() {
      return {
        headBg: true,
        orderNum: this.$route.query.orn,
        userInfo: '', //用户信息
        callData: '', //叫导信息
        endate: '', //截止游玩时间
        scienSopt: '',
        startGoT:''
      }
    },
    components: {
      HeadTop,
      TimeCountUp
    },
    mounted() {
      let callData = callInfo.get('callInfo'), scienSopt = callInfo.get('scienSopt'),
          userInfo = UserInfo.get('userInfo');
      console.log(callData)


      if (callData) {
        //呼叫导游开始
        this.callData = JSON.parse(callData)

        let goda = this.callData.godate.replace(/-/g,"/")

        let da = new Date(goda)
        da.setTime(da.getTime()+ (this.callData.playday -1)*24*60*60*1000)

        this.endate = dateFmt(da, 'yyyy-M-d'); //游玩结束日期
        // this.callGuide(this.callData)
      }
      if (scienSopt) {
        //景区数据
        this.scienSopt = JSON.parse(scienSopt)
      }

      if(userInfo) {
        this.userInfo = userInfo;
      }
      this.amqHander()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log(to)
      this.removeAmq();
      next();
    },
    methods: {
      amqHander(){
        let that = this;

        var userid = this.userInfo.id;
        var amq  = org.activemq.Amq;
        var myDestination = 'topic://tuidan'+ userid
        console.log(userid)
        amq.init({
          uri:'/amq',
          logging: 'true',
          timeout: 20,
          clientId:(new Date()).getTime().toString()
        });
        var myHandler = {
          rcvMessage: function (message) {
            //"{type:0, msg:'已通知向导数"+count+"人，请稍微等待向导接单。',ordernumber:'"+ordernumber+"'}"
            console.log(message.data)

            var msg = JSON.parse(message.data);
            if(msg.type == 0) {
              //已通知多少人
              console.log(msg)
            } else if(msg.type == 1) {
              //有人接单
              that.$createDialog({
                type: 'confirm',
                title: '消息通知',
                content: msg.msg,
                confirmBtn: {
                  text: '查看订单',
                  active: true,
                  disabled: false,
                  href: 'javascript:;'
                },
                cancelBtn: {
                  text: '取消',
                  active: false,
                  disabled: true,
                  href: 'javascript:;'
                },
                onConfirm: () => {
                  //跳转订单支付页
                  that.$router.replace({name: 'order',query: {orderNum: msg.ordernumber}})
                  that.$createToast({
                    type: 'warn',
                    time: 1000,
                    txt: '点击确认按钮'
                  }).show()

                },
                onCancel: () => {
                  that.$createToast({
                    type: 'warn',
                    time: 1000,
                    txt: '点击取消按钮'
                  }).show()
                }
              }).show()

            }
//            that.$createDialog({
//              type: 'confirm',
//              title: '消息通知',
//              content: msg.msg,
//              confirmBtn: {
//                text: '查看订单',
//                active: true,
//                disabled: false,
//                href: 'javascript:;'
//              },
//              cancelBtn: {
//                text: '取消',
//                active: false,
//                disabled: true,
//                href: 'javascript:;'
//              },
//              onConfirm: () => {
//                //跳转订单支付页
//                that.$router.replace({name: 'order',query: {orderNum: msg.ordernumber}})
//                that.$createToast({
//                  type: 'warn',
//                  time: 1000,
//                  txt: '点击确认按钮'
//                }).show()
//
//              },
//              onCancel: () => {
//                that.$createToast({
//                  type: 'warn',
//                  time: 1000,
//                  txt: '点击取消按钮'
//                }).show()
//              }
//            }).show()

          }
        }

        amq.addListener('msg', myDestination, myHandler.rcvMessage);

      },
      removeAmq(){
        var userid = this.userInfo.id;
        var amq  = org.activemq.Amq;
        var myDestination = 'topic://tuidan'+ userid;
        console.log('这里要移除')
        amq.removeListener('msg', myDestination, 'unlisten')
      },
      callGuide(data) {
        onkeyCallGuide(data).then(res => {

          console.log('请求结束')
          console.log(res);
          if (res.msg) {
            this.$createDialog({
              type: 'alert',
              title: '温馨提示',
              content: res.msg,
              showClose: true
            }).show()
          } else {
            console.log(res.data)
            //开始呼导游
            // this.amqHander()
          }
        })
      },

      cancelGuide() {
        // this.$createDialog({
        //   type: 'confirm',
        //   title: '消息通知',
        //   content: '这个是也是爱上大 ',
        //   confirmBtn: {
        //     text: '查看订单',
        //     active: true,
        //     disabled: false,
        //     href: 'javascript:;'
        //   },
        //   cancelBtn: {
        //     text: '取消',
        //     active: false,
        //     disabled: false,
        //     href: 'javascript:;'
        //   },
        //   onConfirm: () => {
        //
        //     this.$createToast({
        //       type: 'warn',
        //       time: 1000,
        //       txt: '点击确认按钮'
        //     }).show()
        //
        //
        //   },
        //   onCancel: () => {
        //     this.$createToast({
        //       type: 'warn',
        //       time: 1000,
        //       txt: '点击取消按钮'
        //     }).show()
        //   }
        // }).show()
        onkeyCancelGuide({
          ordernumber: this.orderNum
        }).then(res => {
          console.log(res)
          if (res.msg) {
            this.$createDialog({
              type: 'alert',
              title: '温馨提示',
              content: res.msg,
              showClose: true
            }).show()
          } else {
            console.log(res.data)
          }
        })
      },
      endLog: function(){
        console.log('....')
      }

    }

  }
</script>
