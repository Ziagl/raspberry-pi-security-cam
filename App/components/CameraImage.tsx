import React from 'react';
import {
    Text,
    Image,
    StyleSheet
} from 'react-native';

interface Props {
    name: string;
    filename: string;
    timestamp: string;
}

class CameraImage extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    convertTime(time: string): string {
        // Split timestamp into [ Y, M, D, h, m, s ]
        const t = time.split(/[- :]/);

        // Apply each element to the Date function
        const d = new Date(
            Date.UTC(
                parseInt(t[0]),
                parseInt(t[1]) - 1,
                parseInt(t[2]),
                parseInt(t[3]),
                parseInt(t[4]),
                parseInt(t[5])
            )
        );

        return this.convertNumber(d.getDate()) + "." +
            this.convertNumber(d.getMonth() + 1) + "." +
            this.convertNumber(d.getFullYear()) + " " +
            this.convertNumber(d.getHours()) + ":" +
            this.convertNumber(d.getMinutes());
    }

    convertNumber(data: number): string {
        if (data < 10) {
            return "0" + data;
        }
        return data.toString();
    }

    render() {
        return (
            <>
                <Text style={styles.textHeader}>{this.props.name}</Text>
                <Image
                    fadeDuration={1000}
                    resizeMode={'contain'}
                    source={{ uri: this.props.filename + "?" + Math.floor(Math.random() * 10000000) }}
                    style={styles.image}
                />
                <Text style={styles.textFooter}>{this.convertTime(this.props.timestamp)}</Text>
            </>
        );
    }
};

const styles = StyleSheet.create({
    image: {
        height: 300,
    },
    textHeader: {
        color: 'black',
        fontSize: 20,
    },
    textFooter: {
        color: 'black',
        fontSize: 15,
        paddingBottom: 10,
        textAlign: 'right',
    },
});

export default CameraImage;