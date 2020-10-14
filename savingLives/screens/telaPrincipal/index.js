import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {faPlay as play} from '@fortawesome/free-solid-svg-icons';
import {faInfo as infos} from '@fortawesome/free-solid-svg-icons';
import {faPencilAlt as pencil} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Topic from '../../components/Topic';
import MinhasInformacoes from '../MinhasInformacoes';
import MinhaMensagem from '../MinhaMensagem';
import MeuVideo from '../MeuVideo';
import ImagePicker from 'react-native-image-crop-picker';
import user from '../..//assets/defaults/user.png';

const width = Dimensions.get('screen').width / 100 * 90

export default class TelaPrincipal extends React.Component{

    state = {
        id : 0,
        user : '',
        loading: true,
        error : false,
        colorIcon : '#C6C5C5',
        colorFont : '#C6C5C5',
        snap : 'center',
        photo : user,
        video : '',
        hasVideo : false,
        nameTopic : 'MinhasInformacoes',
        snapToEnd : false
    };

    handleAddVideo = () =>{
        const {
            navigation : {navigate},
        } = this.props;
        navigate('VideoScreen')
    }

    onScrollColor = e => {
        let position = e.nativeEvent.contentOffset.x
        console.log(position)
        if(position <= 162){
            this.setState({
                nameTopic : 'MinhasInformacoes',
            });
        }else if(position >= 162 && position <= 486){  
            this.setState({
                nameTopic : 'MinhaMensagem'
            });
        }else if(position >= 486 && position ){
            this.setState({
                nameTopic : 'MeuVideo'
            });
        }
    }

    onClickVideo = () =>{
        this.setState({
            snapToEnd : true
        })
    }

    // AskPermissionCamera = async () =>{
    //     try{
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title : 'Acesso à câmera',
    //                 message : 'Você nos permite acessar sua câmera?',
    //                 buttonPositive : 'Permitir',
    //                 buttonNegative : 'Negar'
                    
    //             }
    //         )
    //         if(granted === PermissionsAndroid.RESULTS.GRANTED){
    //             console.warn('Você deixou a gente acessar sua câmera!!!')
    //         }else{
    //             console.warn('Você não deixou a gente acessar à câmera')
    //         }
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    // HandlePermission = async () =>{
    //     const granted = await this.AskPermissionCamera();
    // }

    useFromLibrary = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.setState({
                photo : {uri : image.path}
            });
          });
    }



    render(){
        const {colorIcon, colorFont, nameTopic, photo, video, hasVideo, snapToEnd} = this.state
        return( 
            <ScrollView style={{backgroundColor : '#ECECEC'}}>
           <Header text={"Minhas informações"}/>
            <View style={styles.container}>
                <TouchableOpacity onPress={this.useFromLibrary}>
                <Image source={photo} style={styles.photo}/>
                </TouchableOpacity>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.reverence}>Olá User!</Text>
                    <Text style={styles.textReverece}>Aqui você pode visualizar e editar seus dados!</Text>
                </View>
            </View>
            

            <View style={styles.optionsNavigation}>
                {nameTopic == 'MinhasInformacoes' && (
                    <>
                        <Topic 
                            icon={infos} 
                            style={{backgroundColor : '#009640', width : 60, height : 60 }} 
                            text={'Minhas informações'} 
                            backgroundText={colorFont} 
                            size={36} 
                            onPress={this.snap}
                        />
                        <Topic 
                            icon={pencil} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Minha mensagem'} 
                            backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                        <Topic 
                            icon={play} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Meu vídeo'} backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                    </>
                )}
                {nameTopic === 'MinhaMensagem' &&(
                    <>
                        <Topic 
                            icon={infos} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Minhas informações'} 
                            backgroundText={colorFont} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                        <Topic 
                            icon={pencil} 
                            style={{backgroundColor : '#009640', width : 60, height : 60 }} 
                            text={'Minha mensagem'} 
                            backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                        <Topic 
                            icon={play} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Meu vídeo'} 
                            backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                    </>
                )}

                {nameTopic === 'MeuVideo' &&(
                    <>
                        <Topic 
                            icon={infos} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Minhas informações'} 
                            backgroundText={colorFont} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                        <Topic 
                            icon={pencil} 
                            style={{backgroundColor : colorIcon, width : 60, height : 60}} 
                            text={'Minha mensagem'} 
                            backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                        <Topic 
                            icon={play} 
                            style={{backgroundColor : '#009640', width : 60, height : 60 }} 
                            text={'Meu vídeo'} 
                            backgroundText={'#C6C5C5'} 
                            size={36} 
                            onPress={this.onClickVideo}
                        />
                    </>
                )}
               
            </View>

            {/* Precisa colocar uma função para mudar os Options navigation conforme o scroll ao lado */}
            <ScrollView 
                style={styles.options} 
                horizontal={true} 
                pagingEnabled={true}
                keyboardDismissMode={'on-drag'} 
                onScroll={this.onScrollColor} 
                snapToEnd={snapToEnd}
            >
               <MinhasInformacoes/>
               <MinhaMensagem/>
               <MeuVideo onPress={this.chooseVideo} video={video} hasVideo={hasVideo} onPress={this.handleAddVideo}/>
            </ScrollView>
            </ScrollView>

        );
    }

}

const styles = StyleSheet.create({
   container : {
       width : width,
       alignSelf : 'center',
       flexDirection : 'row',
       justifyContent : 'space-between',
       height : 170,
       alignItems : 'center'
   },
   photo : {
       width : 100,
       height : 100,
       borderRadius : 100
   },
   descriptionContainer : {
       width : 190,
       flexDirection : 'column',
       alignItems : 'center'
   },
   reverence : {
       fontSize : 20,
       marginBottom : 16
   },
   textReverece : {
       textAlign : 'center'
   },
   optionsNavigation : {
       width : width,
       justifyContent : 'space-between',
       flexDirection : 'row',
       alignSelf : 'center'
   },
   options : {
       width : width,
       alignSelf : 'center'
   },
})
