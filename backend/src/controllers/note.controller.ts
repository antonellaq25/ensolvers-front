import type { Request, Response } from "express";
import * as noteService from "../services/note.service.ts";

export const create = async (req: Request, res: Response) => {
	try {
		const { title, content, categories = [] } = req.body;
		const note = await noteService.createNote(title, content, categories);
		res.status(201).json(note);
	} catch (error) {
		res.status(500).json({ error: "Failed to create note" });
	}
};

export const list = async (_req: Request, res: Response) => {
	try {
		const notes = await noteService.getNotes();
		res.json(notes);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch notes" });
	}
};

export const filterNotes = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page ?? 1);
		const limit = Number(req.query.limit ?? 10);
		const title = req.query.title ? String(req.query.title) : undefined;

		let categories: string[] | undefined;
		if (req.query.categories) {
			categories = Array.isArray(req.query.categories)
				? req.query.categories.map(String)
				: [String(req.query.categories)];
		}

		const result = await noteService.getNotesByFilter(
			page,
			limit,
			categories,
			title
		);

		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Failed to filter notes" });
	}
};
export const updateNote = async (
  req: Request,
  res: Response, 
	next: Function
) => {
  try {
    const id = Number(req.params.id);
    const { title, content, isArchived } = req.body;

    const note = await noteService.updateNote(id, {
      title,
      content,
      isArchived,
    });

    res.json(note);
  } catch (error) {
    next(error);
  }
};
export const deleteNote = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = Number(req.params.id);

    await noteService.deleteNote(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export const archiveNote = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = Number(req.params.id);
    const note = await noteService.archiveNote(id);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const unarchiveNote = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = Number(req.params.id);
    const note = await noteService.unarchiveNote(id);
    res.json(note);
  } catch (error) {
    next(error);
  }
};
