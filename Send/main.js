//获取DOM元素
const app = document.querySelector('.send-app');
const buttons = document.querySelectorAll('.ui-button');
const errorRadio = document.querySelector('#error-radio');
const chanceRadio = document.querySelector('#chance-radio');

//状态对象
const states = {
    send: {
        on: {
            CLICK: 'sendding'
        }
    },
    sendding: {
        onEntry: () => {
            setTimeout(() => {
                if (errorRadio.checked) {
                    send('ERROR');
                    return;
                } else if (chanceRadio.checked) {
                    if (Math.random() < .5) {
                        send('SENT');
                    } else {
                        send('ERROR');
                    }
                } else {
                    send('SENT');
                }
            }, 2500);
        },
        on : {
            SENT: 'sent',
            ERROR: 'error'
        }
    },
    error: {
        on: {
            RETRY: 'sendding',
            CANCEL: 'send'
        }
    },
    sent: {
        on: {
            CLICK: 'send'
        }
    }
}

//当前状态初始化为send
let currentState = 'send';

const send = (event) => {
    const nextState = states[currentState].on[event] || currentState;

    if (currentState != nextState) {
        const entryAction = states[nextState].onEntry;
        if (entryAction) {
            entryAction();
        }
    }

    active(nextState);

    currentState = nextState;
}

//根据状态显示相应的UI
const active = (state) => {
    app.dataset.prevState = currentState;
    app.dataset.state = state;
    //如果data-show为state则显示 
    document.querySelectorAll('[data-active]').forEach(el => {
        if (el.dataset.show === state) {
            el.dataset.active = true;
        } else {
            el.dataset.active = false;
        }
    });
}

//初始显示send
active(currentState);

//监听事件
buttons.forEach(el => {
    el.addEventListener('click', () => {
        send(el.dataset.click || 'CLICK');
    })
})
