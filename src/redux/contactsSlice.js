import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { selectNameFilter } from './filtersSlice';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
        state.error = null;
      })

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items.push(payload);
      })

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(({ id }) => id === payload.id);
        state.items.splice(index, 1);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase())
    )
);
