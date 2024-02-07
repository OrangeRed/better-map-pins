import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { pinData, users } from '.'

export const sources = sqliteTable('sources', {
	// id: text('id').notNull().primaryKey(),
	sourceUrl: text('sourceUrl').notNull().primaryKey(),
	queryUrl: text('queryUrl').notNull()
})

export const sourceRelation = relations(sources, ({ many }) => ({
	users: many(sourcesToUsers),
	pinData: many(sourcesToPinData)
}))

// "sources to users" linking table
export const sourcesToUsers = sqliteTable('sources_to_users', {
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	sourceUrl: text('source_url')
		.notNull()
		.references(() => sources.sourceUrl)
})

export const sourcesToUsersRelations = relations(sourcesToUsers, ({ one }) => ({
	user: one(users, {
		fields: [sourcesToUsers.userId],
		references: [users.id]
	}),
	source: one(sources, {
		fields: [sourcesToUsers.sourceUrl],
		references: [sources.sourceUrl]
	})
}))

// "pin_data to sources" linking table
export const sourcesToPinData = sqliteTable('sources_to_pin_data', {
	sourceUrl: text('source_url')
		.notNull()
		.references(() => sources.sourceUrl),
	pinDataId: text('pin_data_id')
		.notNull()
		.references(() => pinData.id)
})

export const sourcesToPinDataRelations = relations(sourcesToPinData, ({ one }) => ({
	pinData: one(pinData, {
		fields: [sourcesToPinData.pinDataId],
		references: [pinData.id]
	}),
	source: one(sources, {
		fields: [sourcesToPinData.sourceUrl],
		references: [sources.sourceUrl]
	})
}))
