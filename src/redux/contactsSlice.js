import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { selectNameFilter } from './filtersSlice';
import { getContacts, addContact, getContacts } from './contactsOps';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], isLoading: false, isError: null },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, handlePending)
      .addCase(getContacts.rejected, handleRejected)
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
        state.isError = null;
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = null;
        state.contacts.push(payload);
      })

      .addCase(removeContact.pending, handlePending)
      .addCase(removeContact.rejected, handleRejected)
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = null;
        const index = state.contacts.findIndex(({ id }) => id === payload.id);
        state.contacts.splice(index, 1);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.contacts;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.isError;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase())
    )
);
