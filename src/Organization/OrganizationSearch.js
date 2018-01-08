import React from "react";
import { AppRegistry, Alert } from "react-native";

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { StackNavigator } from "react-navigation";
import EditScreenOne from "./OrganizationList.js";
import EditScreenTwo from "./OrganizationDetails.js";

export default class OrganizationSearch extends React.Component {
  
    constructor(props){
        super(props)
    
        this.state = {
          service: '',
          provider: '',
          location: ''
        }
      }

  render() {
    return (
      <Container>
        <Content padder>
                <Form>
                    <Item fixedLabel last>
                        <Label>Service</Label>
                        <Input 
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({service:text})}
                        />
                    </Item>
                    <Item fixedLabel last>
                        <Label>Provider</Label>
                        <Input 
                        returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({provider:text})}
                        />
                    </Item>
                    <Item fixedLabel last>
                        <Label>Location</Label>
                        <Input returnKeyLabel = {"next"}
                        onChangeText={(text) => this.setState({location:text})}
                        />
                    </Item>
                </Form>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("OrganizationList",
             {service: this.state.service,
              provider: this.state.provider,
              location: this.state.location})}
          >
            <Text>Search</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
OrganizationSearch.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Search</Title>
      </Body>
      <Right />
    </Header>
  )
});
