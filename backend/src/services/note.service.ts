import prisma from "../lib/prisma";

export const createNote = async (
	title: string,
	content: string,
	categories: string[] = []
) => {
	return prisma.note.create({
		data: {
			title,
			content,
			categories: {
				create: categories.map((name) => ({
					category: {
						connectOrCreate: {
							where: { name },
							create: { name },
						},
					},
				})),
			},
		},
		include: {
			categories: {
				include: {
					category: true,
				},
			},
		},
	});
};

export const getNotes = async () => {
	return prisma.note.findMany({
		where: { isArchived: false },
		include: {
			categories: {
				include: {
					category: true,
				},
			},
		},
	});
};
export const getNotesByFilter = async (
	page: number = 1,
	limit: number = 10,
	categories?: string[],
	title?: string
) => {
	const where: any = {
		isArchived: false,
	};

	if (title) {
		where.title = {
			contains: title,
			mode: "insensitive",
		};
	}

	if (categories && categories.length > 0) {
		where.categories = {
			some: {
				category: {
					name: {
						in: categories,
					},
				},
			},
		};
	}

	const [total, notes] = await Promise.all([
		prisma.note.count({ where }),
		prisma.note.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { id: "desc" },
			include: {
				categories: {
					include: {
						category: true,
					},
				},
			},
		}),
	]);

	return {
		total,
		page,
		pages: Math.ceil(total / limit),
		notes,
	};
};

export const updateNote = async (
  id: number,
  data: {
    title?: string;
    content?: string;
    isArchived?: boolean;
    addCategories?: string[];
    removeCategories?: string[];
  }
) => {
  const { addCategories, removeCategories, ...rest } = data;

  if (removeCategories && removeCategories.length > 0) {
    const categoriesToRemove = await prisma.category.findMany({
      where: { name: { in: removeCategories } },
      select: { id: true },
    });

    await prisma.noteCategory.deleteMany({
      where: {
        noteId: id,
        categoryId: { in: categoriesToRemove.map((c) => c.id) },
      },
    });
  }

  const categoryOperations: any = {};

  if (addCategories && addCategories.length > 0) {
    categoryOperations.create = addCategories.map((name) => ({
      category: {
        connectOrCreate: {
          where: { name },
          create: { name },
        },
      },
    }));
  }

  return prisma.note.update({
    where: { id },
    data: {
      ...rest,
      ...(Object.keys(categoryOperations).length > 0 && {
        categories: categoryOperations,
      }),
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};
export const deleteNote = async (id: number) => {
  return prisma.note.delete({
    where: { id },
  });
};

export const archiveNote = async (id: number) => {
  return prisma.note.update({
    where: { id },
    data: { isArchived: true },
  });
};

export const unarchiveNote = async (id: number) => {
  return prisma.note.update({
    where: { id },
    data: { isArchived: false },
  });
};