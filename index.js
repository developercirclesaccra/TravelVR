import React, { Fragment } from 'react';
import {
    AppRegistry,
    asset,
    StyleSheet,
    Environment,
    Prefetch,
    View,
    Image,
    NativeModules,
    VrButton
} from 'react-360';
import Flag from './components/Flag';

const { TitleChanger, AudioModule } = NativeModules;

const PLACES = [
    {
        name: 'Space',
        flag: 'flag_nasa.png',
        panorama: 'stars.png'
    },
    {
        name: 'Spain',
        flag: 'flag_spain.png',
        panorama: 'spain.jpg'
    },
    {
        name: 'Italy',
        flag: 'flag_italy.png',
        panorama: 'italy.jpg'
    },
    {
        name: 'Ukraine',
        flag: 'flag_ukraine.jpg',
        panorama: 'ukraine.jpg'
    }
];

export default class TravelVR extends React.Component {
    state = {
        activeFlag: ''
    };

    changeBackground(panorama, name) {
        Environment.setBackgroundImage(asset(panorama));
        TitleChanger.changeTitle(name);
    }

    renderFlags() {
        return PLACES.map(({ flag, panorama, name }) => {
            return (
                <Fragment key={flag}>
                    <Prefetch source={asset(panorama)} />
                    <VrButton
                        onEnter={() => this.setState({ activeFlag: flag })}
                        onExit={() => this.setState({ activeFlag: '' })}
                        onClick={() => {
                            this.changeBackground(panorama, name);
                            AudioModule.playEnvironmental({
                                source: asset('music.mp3'),
                                volume: 0.7
                            });
                        }}
                    >
                        <Flag image={flag} activeFlag={this.state.activeFlag} />
                    </VrButton>
                </Fragment>
            );
        });
    }


    render() {
        const { flagContainer } = styles;

        return <View style={flagContainer}>{this.renderFlags()}</View>;
    }
}

const styles = StyleSheet.create({
    flagContainer: {
        height: 600,
        width: 4680,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

AppRegistry.registerComponent('TravelVR', () => TravelVR);
AppRegistry.registerComponent('Flag', () => Flag);
