import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, ErrorType, OrderingType } from '../../../../shared'
import { RootState } from '../../../state'
import { Venue } from '../../model'
import { VenueService } from '../../service'

export interface VenueState {
  venue: Venue | undefined
  currentCategory: string
  orderingType: OrderingType | undefined
  orderingEnabled: boolean
  fetchCategoriesLoading: boolean
  fetchCategoriesError: ErrorType | undefined
  siteLocation: string
}

const initialState: VenueState = {
  venue: null,
  currentCategory: '',
  orderingEnabled: false,
  orderingType: null,
  siteLocation: null,
  fetchCategoriesLoading: true,
  fetchCategoriesError: null
}
export { initialState as initialStateVenue }

export const fetchCategories = createAsyncThunk(
  'venue/fetchCategories',
  async (_, { getState }) => {
    const state: RootState = getState() as RootState
    const currentVenueId = state.venue.venue.id
    const resp: Category[] = (await VenueService.getVenueCategories(currentVenueId)).data
    return resp
  }
)

export const { reducer: venueReducer, actions: venueActions } = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }: PayloadAction<string>) => {
      state.currentCategory = payload
    },
    setOrderingEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.orderingEnabled = payload
    },
    setOrderingType: (state, { payload }: PayloadAction<OrderingType>) => {
      state.orderingType = payload
    },
    setOnSiteLocation: (state, { payload }: PayloadAction<string>) => {
      state.siteLocation = payload
      state.orderingType = OrderingType.ON_SITE
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchCategoriesLoading = true
      state.fetchCategoriesError = null
    })
    builder.addCase(fetchCategories.fulfilled, (state, { payload }: PayloadAction<Category[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.venue = {
        ...state.venue,
        categories: payload
      }
      state.fetchCategoriesLoading = false
      if (payload.length) state.currentCategory = payload[0].title
    })
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchCategoriesLoading = false
      state.fetchCategoriesError = {
        message: 'Възникна проблем със зареждането на менюто. Моля опитайте по-късно!'
      }
    })
  }
})
