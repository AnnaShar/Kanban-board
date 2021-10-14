const boards = {
    'b1': {
        id: 'b1',
        name: 'My board',
        columns: [
            {
                id: 'c1',
                name: 'TODO'
            },
            {
                id: 'c2',
                name: 'In progress'
            },
            {
                id: 'c3',
                name: 'Done'
            }],
        tasks: [
            {
                id: 1,
                name: 'Make somebody laugh :)',
                columnId: 'c1'
            },
            {
                id: 2,
                description: 'Dance funny dance!',
                column: 'TODO'
            },
            {
                id: 3,
                description: 'Sing imaginary song',
                column: 'TODO'
            },
            {
                id: 4,
                description: 'Work a little bit',
                column: 'Done'
            },
            {
                id: 5,
                description: 'Make cat\'s eyes to get some food',
                column: 'Done'
            }
        ]
    }
}
