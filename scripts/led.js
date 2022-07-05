const LED_DEFAULT = {
    on: true,
    spd: {
        cur: 0,
        max: 10,
        min: 0,
        step: 0.5,
        interval: 0,
    },
    color: {
        cur: 'warning',
        available:  [
            {
                string: '藍色',
                value: 'primary',
            },
            {
                string: '橘色',
                value: 'warning',
            },
            {
                string: '紅色',
                value: 'danger',
            },
            {
                string: '白色',
                value: 'light',
            },
        ],
    },
}

/* copy a data for saving default value */
let led_set = JSON.parse( JSON.stringify(LED_DEFAULT))