"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Loading from '@/app/loading';
import SchoolService from '@/utils/services/schoolService';

const columns: TableColumnsType<School> = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend'],
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Founding Date',
        dataIndex: 'foundingDate',
        sorter: (a, b) => Date.parse(a.foundingDate) - Date.parse(b.foundingDate),
        sortDirections: ['descend'],
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        sorter: (a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate),
        sortDirections: ['descend'],
    },
    {
        title: 'Last Updated',
        dataIndex: 'lastUpdated',
        sorter: (a, b) => Date.parse(a.lastUpdated) - Date.parse(b.lastUpdated),
        sortDirections: ['descend'],
    },
];

const data = async () => {
    try {
        const schools = await SchoolService.getAllService();
        return schools;
    } catch (error) {
        console.error('Error fetching schools:', error);
    }
};


const onChange: TableProps<School>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableBody: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const schools = await SchoolService.getAllService();
                console.log(schools);
                
                setSchools(schools);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <Table columns={columns} dataSource={schools} onChange={onChange} />
        </Suspense>
    )


}

export default TableBody;