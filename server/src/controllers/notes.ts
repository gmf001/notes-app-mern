import { Request, Response } from 'express';
import { Note } from '../models/Note';

export const getNotes = async (_: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERR_GET_NOTES' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERR_CREATE_NOTE' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERR_UPDATE_NOTE' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'NOTE_DELETED' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERR_DELETE_NOTE' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ERR_GET_NOTE' });
  }
};
