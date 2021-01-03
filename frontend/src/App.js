import { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, DatePicker, RadioGroup, Radio, InputNumber, Schema, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

function App() {
  const { StringType, NumberType, DateType } = Schema.Types;
  const [formValue, setFormValue] = useState({});
  const [form, setFormRef] = useState(null);

  const model = Schema.Model({
    firstname: StringType().isRequired('First name required to make investment'),
    lastname: StringType().isRequired('Last name required to make investment'),
    dob: DateType().isRequired('valid date required'),
    email: StringType()
      .isEmail('please enter a valid email')
      .isRequired('Email required to make investment'),
    number: NumberType().isRequired('Number required to make investment'),
    type: StringType().isRequired('Type of investment required'),
    amount: NumberType().isRequired('Amount required to make investment'),
  });

  const fixDate = (date) => {
    if (!date) {
      return;
    }
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  const handleSubmit = () => {
    if (!form.check()) {
      return;
    }

    fetch('http://localhost:8000/api/invest/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formValue
      })
    }).then(res => res.json()).then(data => console.log(data));
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Form
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
          <CustomField
            name="type"
            label="type"
            accepter={RadioGroup}
          >
            <Radio value={"premium"}>Premium</Radio>
            <Radio value={"select"}>Select</Radio>
          </CustomField>
          <CustomField
            accepter={InputNumber}
            name="amount"
            prefix={"$"}
          />
          <FormGroup>
            <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
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

export default App;
