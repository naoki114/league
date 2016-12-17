import Immutable from  'immutable';

const dummyMatchResults = Immutable.fromJS({
	players: {	
		idList: ['A', 'B', 'C'],
		byId: {
			A: {
				name: 'テスト１',
				matchResultIdMap: { B:'1', C:'2'}
			},
			B: {
				name: 'テスト２',
				matchResultIdMap: { 'A':'1', 'C':'3'}
			},
			C: {
				name: 'テスト３',
				matchResultIdMap: { 'A':'2', 'B':'3'}
			}
		},
	},
	matchResults: {
		byId: {
			1: {
				winner: 'A',
				A: {
					point: 5,
				},
				B: {
					point: 2,
				}
			},
			2: {
				winner: 'C',
				A: {
					point: 4,
				},
				C: {
					point: 5,
				}
			},
			3: {
				winner: 'C',
				B: {
					point: 2,
				},
				C: {
					point: 5,
				}
			}
		}
	}
});

export default dummyMatchResults;