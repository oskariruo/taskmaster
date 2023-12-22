import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

export default function ConfirmationDialog({ open, onClose, onConfirm }) {
    return (
        <Dialog open={open} 
            onClose={onClose}
        >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this task?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button 
                    onClick={onConfirm} 
                    variant='contained' 
                    color='error'
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}