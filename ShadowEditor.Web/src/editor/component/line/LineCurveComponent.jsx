import { PropertyGrid, PropertyGroup, TextProperty, DisplayProperty, CheckBoxProperty, NumberProperty, IntegerProperty, SelectProperty, ButtonsProperty, Button } from '../../../third_party';

/**
 * 椭圆曲线组件
 * @author tengge / https://github.com/tengge1
 */
class LineCurveComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: false,
            v1x: 0,
            v1y: 0,
            v1z: 0,
            v2x: 0,
            v2y: 0,
            v2z: 0,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, v1x, v1y, v1z, v2x, v2y, v2z } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={L_LINE_CURVE} show={show} expanded={expanded} onExpand={this.handleExpand}>
            <NumberProperty label={'Point1 X'} name={'v1x'} value={v1x} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point1 Y'} name={'v1y'} value={v1y} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point1 Z'} name={'v1z'} value={v1z} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 X'} name={'v2x'} value={v2x} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 Y'} name={'v2y'} value={v2y} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 Z'} name={'v2z'} value={v2z} onChange={this.handleChange}></NumberProperty>
        </PropertyGroup>;
    }

    componentDidMount() {
        app.on(`objectSelected.LineCurveComponent`, this.handleUpdate.bind(this));
        app.on(`objectChanged.LineCurveComponent`, this.handleUpdate.bind(this));
    }

    handleExpand(expanded) {
        this.setState({
            expanded,
        });
    }

    handleUpdate() {
        const editor = app.editor;

        if (!editor.selected || editor.selected.userData.type !== 'LineCurve') {
            this.setState({
                show: false,
            });
            return;
        }

        this.selected = editor.selected;

        let points = this.selected.userData.points;

        this.setState({
            show: true,
            v1x: points[0].x,
            v1y: points[0].y,
            v1z: points[0].z,
            v2x: points[1].x,
            v2y: points[1].y,
            v2z: points[1].z,
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value,
            });
            return;
        }

        const { v1x, v1y, v1z, v2x, v2y, v2z } = Object.assign({}, this.state, {
            [name]: value,
        });

        this.selected.userData.points = [
            new THREE.Vector3(v1x, v1y, v1z),
            new THREE.Vector3(v2x, v2y, v2z),
        ];

        this.selected.update();

        app.call('objectChanged', this, this.selected);
    }
}

export default LineCurveComponent;