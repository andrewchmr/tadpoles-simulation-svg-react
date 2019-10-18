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
const width = window.innerWidth / 5;
const height = window.innerHeight / 5;

class App extends React.Component<{}, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            vx: 0.3 * v,
            vy: 0.3 * v,
            px: new Array(m).fill(Math.random() * width),
            py: new Array(m).fill(Math.random() * height),
            count: 0
        }
    }

    componentDidMount() {
        console.log(this.state.vx);
        console.log(this.state.vy)
        setInterval(() => this.update(), 20);
    }

    update() {
        let dx = this.state.vx;
        let dy = this.state.vy;
        let x = this.state.px[0] += dx;
        let y = this.state.py[0] += dy;
        let speed = Math.sqrt(dx * dx + dy * dy);
        const countNew = speed * 10;
        const k1 = -5 - speed / 3;

        // Bounce off the walls.
        if (x < 0 || x > width) {
            this.setState({vx: -1 * this.state.vx})
        }
        if (y < 0 || y > height) {
            this.setState({vy: -1 * this.state.vy})
        }

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

    getLinePath(px: number[], py: number[]): string {
        const firstPoint = `M${px[0]},${py[0]}`;
        let buffer = ``;
        for (let i = 1; i < px.length; i++) {
            buffer += `L${px[i]},${py[i]}`;
        }
        return `${firstPoint}${buffer}`;
    }

    render() {
        const tailPx = this.state.px.slice(0, 3);
        const tailPy = this.state.py.slice(0, 3);
        const rotationEllipse = `${Math.atan2(this.state.vy, this.state.vx) * (180 / Math.PI)}, ${this.state.px[0]}, ${this.state.py[0]}`;

        return <svg viewBox={`0 0 ${width} ${height}`}>
            <path strokeLinecap="round" d={this.getLinePath(this.state.px, this.state.py)} stroke={"white"}/>
            <ellipse
                transform={`rotate(${rotationEllipse})`}
                cx={this.state.px[0]} cy={this.state.py[0]} rx={Math.PI * 2} ry={4} fill={"white"}/>
            <path strokeWidth={3} strokeLinecap="round" d={this.getLinePath(tailPx, tailPy)} stroke={"white"}/>
        </svg>
    }
}

export default App;
