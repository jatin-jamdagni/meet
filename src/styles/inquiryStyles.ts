import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const inquiryStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHandle: {
    position: "absolute",
    left: "50%",
    backgroundColor: "#bbb",
    width: 30,
    height: 5,
    borderRadius: 2,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 3,
    fontFamily: 'OpenSans-Medium',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: RFValue(12),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 5,
    width: '48%',
    // marginHorizontal:5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5A5F',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(12),

    fontFamily: 'OpenSans-Medium',
  },
});
