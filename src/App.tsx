import React from 'react';
import './App.css';

interface AppState {
    vx: number,
    vy: number,
    px: number[],
    py: number[],
    count: number
}

const v = 2;
const m = 12;
const width = window.innerWidth;
const height = window.innerHeight;

class App extends React.Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            vx: (Math.random() - 0.5) * v,
            vy: (Math.random() - 0.5) * v,
            px: new Array(m).fill(Math.random() * width),
            py: new Array(m).fill(Math.random() * height),
            count: 0
        }
    }

    componentDidMount(){
        setInterval(() => this.update(), 20);
    }

    update(){
        let dx = this.state.vx;
        let dy = this.state.vy;
        let x = this.state.px[0] += dx;
        let y = this.state.py[0] += dy;
        let speed = Math.sqrt(dx * dx + dy * dy);
        const countNew = speed * 10;
        const k1 = -5 - speed / 3;

        // Bounce off the walls.
        if (x < 0 || x > width) {this.setState({vx: -1* this.state.vx})}
        if (y < 0 || y > height) {this.setState({vy: -1*this.state.vy})}

        // Swim!
        for (let j = 1; j < m; ++j) {
            const vx = x - this.state.px[j];
            const vy = y - this.state.py[j];
            this.setState({count: this.state.count + countNew});
            const k2 = Math.sin(((this.state.count) + j * 3) / 300) / speed;
            this.state.px[j] = (x += dx / speed * k1) - dy * k2;
            this.state.py[j] = (y += dy / speed * k1) + dx * k2;
            speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
            this.setState({px: this.state.px, py: this.state.py})
        }
    }

    render() {

        const lines = [];
        for(let i = 1; i < m; ++i){
            lines.push(<line strokeWidth={2} stroke={"white"} x1={this.state.px[i-1]} y1={this.state.py[i-1]} x2={this.state.px[i]} y2={this.state.py[i]}/>)
        }

        return <svg width={width} height={height}>
            <ellipse transform={`rotate(${Math.atan2(this.state.vy, this.state.vx) * (180 / Math.PI)}, ${this.state.px[0]}, ${this.state.py[0]})`} cx={this.state.px[0]} cy={this.state.py[0]} rx={Math.PI*2} ry={4} fill={"white"}/>
            <line  stroke-linecap="round" strokeWidth={4} stroke={"white"} x1={this.state.px[0]} y1={this.state.py[0]} x2={this.state.px[1]} y2={this.state.py[1]}/>
            <line strokeWidth={4} stroke={"white"} x1={this.state.px[1]} y1={this.state.py[1]} x2={this.state.px[2]} y2={this.state.py[2]}/>
            <line  stroke-linecap="round" strokeWidth={4} stroke={"white"} x1={this.state.px[2]} y1={this.state.py[2]} x2={this.state.px[3]} y2={this.state.py[3]}/>

            <line stroke={"white"} x1={this.state.px[0]} y1={this.state.py[0]} x2={this.state.px[1]} y2={this.state.py[1]}/>
            {lines}
        </svg>
    }
}

export default App;
