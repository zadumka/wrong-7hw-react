import { useSelector } from 'react-redux';

import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contactsSlice';

import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  const filter = () => console.log('filter');

  return (
    <>
      <ul className={styles.list}>
        {contacts.map(({ name, number, id }) => (
          <li className={styles.item} key={id}>
            <Contact name={name} number={number} id={id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
