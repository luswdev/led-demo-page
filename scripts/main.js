const app = {
    data() {
        return {
            led: led_set,
            led_blink_timer: undefined,
        }
    },
    methods:
    {
        default_value: function () {
            /* reset speed setting to default */
            led_set.spd.max  = LED_DEFAULT.spd.max
            led_set.spd.min  = LED_DEFAULT.spd.min
            led_set.spd.step = LED_DEFAULT.spd.step

            /* write back to data */
            this.led = led_set
        },
        calc_interval: function (spd) {
            /* show 0 while stop */
            if (spd == 0) {
                return 0
            }
            return 1000 / (spd * 2)
        },
        set_timer: function () {
            this.led.spd.interval = this.calc_interval(this.led.spd.cur)

            /* stop blink and power on */
            if (this.led.spd.cur == 0) {
                this.led.on = true
                return
            }

            this.led_blink_timer = setInterval( () => {
                /* toggle led power on/off */
                this.led.on = !this.led.on
            },  this.led.spd.interval);
        },
        update_timer: function () {
            /* reset timer */
            clearInterval(this.led_blink_timer)

            this.set_timer()
        },
        switch_color: function () {
            let found = false
            let changed = false

            this.led.color.available.forEach( (elem) => {
                /* skip if change is done or is invalid row */
                if (changed == false && elem.value.length > 0) {
                    if (this.led.color.cur == elem.value) {
                        found = true
                    } else if (found) {
                        this.led.color.cur = elem.value
                        changed = true
                    }
                }
            })

            /* not found or found at last index */
            if (changed == false) {
                this.led.color.cur = this.led.color.available[0].value
            }
        }
    },
    mounted: function () {
        /* get setting back from cookies if existed */
        this.led.color.cur = Cookies.get('led-color')    ? Cookies.get('led-color')                : this.led.color.cur
        this.led.spd.cur   = Cookies.get('led-spd')      ? parseFloat(Cookies.get('led-spd'))      : this.led.spd.cur
        this.led.spd.max   = Cookies.get('led-spd-max')  ? parseFloat(Cookies.get('led-spd-max'))  : this.led.spd.max
        this.led.spd.min   = Cookies.get('led-spd-min')  ? parseFloat(Cookies.get('led-spd-min'))  : this.led.spd.min
        this.led.spd.step  = Cookies.get('led-spd-step') ? parseFloat(Cookies.get('led-spd-step')) : this.led.spd.step

        this.set_timer()

        /* prevent tab switch focus element */
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Tab') {
                e.preventDefault()
            }
        })

        /**
         * key up:   blink speed up
         * key down: blink speed down
         * tab:      switch led color
         */
        window.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowUp') {
                this.$refs.set_spd.focus()
            } else if (e.key == 'ArrowDown') {
                this.$refs.set_spd.focus()
            } else if (e.key == 'Tab') {
                e.preventDefault()
                this.switch_color()
            }
        })
    },
    updated: function () {
        /* save setting to cookies */
        Cookies.set('led-spd',      this.led.spd.cur,   { expires: 7, path: '/aver/led' })
        Cookies.set('led-spd-max',  this.led.spd.max,   { expires: 7, path: '/aver/led' })
        Cookies.set('led-spd-min',  this.led.spd.min,   { expires: 7, path: '/aver/led' })
        Cookies.set('led-spd-step', this.led.spd.step,  { expires: 7, path: '/aver/led' })
        Cookies.set('led-color',    this.led.color.cur, { expires: 7, path: '/aver/led' })
    },
}

Vue.createApp(app).mount('#app')