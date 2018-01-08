import React from "react";
import { ActivityIndicator, ListView, View, AppRegistry, Alert } from "react-native";

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
  H1
} from "native-base";

export default class OrganizationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        const serviceVal = state.params.service;
        const providerVal = state.params.provider;
        const locationVal =  state.params.location;
        return fetch('https://mcg-dev.azurewebsites.net/SearchResult/GetProviderByParams?service='+serviceVal+'&provider='+providerVal+'&location='+locationVal)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Search Result</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <ActivityIndicator />
            </View>
        );
    }
    return (
      <Container>
        <Content padder>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Card>
            <CardItem button onPress={() => this.props.navigation.navigate("OrganizationDetails", {orgId: rowData.LocationId})}>
                <Body>
                    <Text>
                        {rowData.OrganizationName}
                    </Text>
                </Body>
            </CardItem>
        </Card>}
        />
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("OrganizationDetails", {orgId: 362478})}
          >
            <Text>Goto Organization Details</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
