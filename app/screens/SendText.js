import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendText } from '../redux/sendText';
import TransactionCard from './components/TransactionCard';

class SendText extends Component {
  constructor() {
    super();
    this.state = {
      sent: false,
    };
  }
  render() {
    if (this.sent) this.props.navigation.navigate('Landing');
    return (
      <View style={styles.screen}>
        <Text>Review the your splits</Text>

        <ScrollView>
          <View style={styles.table}>
            {this.props.transactions.map(transaction =>
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />,
            )}
          </View>
        </ScrollView>

          <Button
            title="Request"
            backgroundColor="#03BD5B"
            borderRadius={25}
            containerViewStyle={styles.button}
            onPress={() => {
              this.props.handleSendText(
                this.props.transactions,
                this.props.user,
              );
            }}
          />
      </View>
    );
  }
}

const mapState = state => ({
  transactions: state.transactions,
  user: state.user,
});

const mapDispatch = dispatch => ({
  handleSendText(transactions, user) {
    dispatch(sendText(transactions, user));
  },
});

export default connect(mapState, mapDispatch)(SendText);

/**
 * PROP TYPES
 */
SendText.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  handleSendText: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#3D4D65'
  },
  table: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    padding: 20
  },
});
