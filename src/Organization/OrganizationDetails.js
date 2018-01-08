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

export default class OrganizationDetails extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        const orgVal = state.params.orgId;
        return fetch('https://mcg-dev.azurewebsites.net/SearchResult/GetProviderById?id='+orgVal)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.ProviderServices),
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
          <Title>Details</Title>
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
            <CardItem>
                <Body>
                    <Text>
                        {rowData.TypeTitle}
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
            onPress={() => this.props.navigation.navigate("OrganizationDetails")}
          >
            <Text>Goto Organization Details</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
