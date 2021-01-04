import { useState } from 'react';
import {
  Schema,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  DatePicker,
  RadioGroup,
  Radio,
  InputNumber,
  Button,
  Popover,
  FlexboxGrid,
  Whisper,
  Icon,
  Modal,
} from 'rsuite';

export default function InvestmentForm() {
  const { StringType, NumberType, DateType } = Schema.Types;
  const [formValue, setFormValue] = useState({});
  const [form, setFormRef] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const speaker = (
    <Popover title="Select the type of Investment">
      <p>Premium: $10,000 to $250,000</p>
      <p>Select: $25,000 to $250,000</p>
    </Popover>
  );

  const model = Schema.Model({
    firstname: StringType().isRequired('First name required to make investment'),
    lastname: StringType().isRequired('Last name required to make investment'),
    dob: DateType().isRequired('valid date required'),
    email: StringType()
      .isEmail('please enter a valid email')
      .isRequired('Email required to make investment'),
    number: NumberType().isRequired('Number required to make investment'),
    type: StringType().isRequired('Type of investment required'),
    amount: NumberType()
      .isRequired('Amount required to make investment')
      .addRule((value, data) => {
        if (data.type === '') {
          return false;
        }
        if (data.type === 'Premium') {
          if (value < 10000 || value > 250000) {
            return false;
          }
        } else if (data.type === 'Select') {
          if (value < 25000 || value > 250000) {
            return false;
          }
        }
        return true;
      }, 'Amount too high or too low for the type of investment.')
  });

  const fixDate = (date) => {
    if (!date) {
      return;
    }
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  const handleSubmit = () => {
    if (!form.check()) {
      return;
    }
    setModalShow(true);

    // Storing data into database.
    fetch('http://localhost:8000/api/invest/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formValue
      })
    });

    // Sending confirmation email.
    console.log('sending email');
    fetch('http://localhost:8000/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'throwaway.earnr@gmail.com',
        to: formValue.email,
        subject: 'Investment Confirmed',
        text: `Congratulations on your Investment!\n\nHey ${formValue.firstname},\n\nYour ${formValue.type} investment of $${formValue.amount} with Earnr has been confirmed.\n\nThank you for choosing Earnr!\n\nSincerely,\nEarnr Team.`,
      })
    }).then(res => console.log(res));
  }

  return (
    <>
      <Form
        layout="horizontal"
        onChange={formValue => setFormValue({ ...formValue, dob: fixDate(formValue.dob) })}
        model={model}
        ref={(ref) => setFormRef(ref)}
      >
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl name="firstname" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Last name</ControlLabel>
          <FormControl name="lastname" />
        </FormGroup>
        <CustomField
          accepter={DatePicker}
          name="dob"
          label="Date of birth"
        />
        <FormGroup>
          <ControlLabel>
            Email
            </ControlLabel>
          <FormControl name="email" type="email" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Phone
            </ControlLabel>
          <FormControl name="number" type="number" />
        </FormGroup>
        <FlexboxGrid>
          <FlexboxGrid.Item>
            <Whisper placement="right" trigger="hover" speaker={speaker} enterable>
              <Icon icon="question2" />
            </Whisper>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <CustomField
              name="type"
              label="Type"
              accepter={RadioGroup}
            >
              <Radio value={"Premium"}>Premium</Radio>
              <Radio value={"Select"}>Select</Radio>
            </CustomField>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <CustomField
          accepter={InputNumber}
          name="amount"
          label="Amount"
          prefix={"$"}
        />
        <FormGroup>
          <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
        </FormGroup>
      </Form>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xs"
      >
        <Modal.Header>
          <h5>Investment Confirmed</h5>
        </Modal.Header>
        <Modal.Body>
          <Icon icon="check" size="2x" style={{ color: '#AED582' }} />
          <p>Congratulations!</p>
          <p>You have successfully made an investment with Earnr!</p>
          <p>You will be contacted by the team shortly via email.</p>
          <p>Thank you for choosing Earnr!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" onClick={() => setModalShow(false)}>Great!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CustomField({ accepter, name, label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl name={name} accepter={accepter} {...props} />
    </FormGroup>
  );
}
