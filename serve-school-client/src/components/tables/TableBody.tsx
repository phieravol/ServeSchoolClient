"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Loading from '@/app/loading';
import SchoolService from '@/utils/services/schoolService';
import formatDate from '@/helpers/dateHelper';

const columns: TableColumnsType<School> = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend'],
    },
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
    },
    {
        key: 'foundingDate',
        title: 'Founding Date',
        dataIndex: 'foundingDate',
        render: (foundingDate) => (foundingDate ? formatDate(foundingDate) : "N/A"),
        sorter: (a, b) => Date.parse(a.foundingDate) - Date.parse(b.foundingDate),
        sortDirections: ['descend'],
    },
    {
        key: 'createdDate',
        title: 'Created Date',
        dataIndex: 'createdDate',
        render: (createdDate) => (createdDate ? formatDate(createdDate) : "N/A"),
        sorter: (a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate),
        sortDirections: ['descend'],
    },
    {
        key: 'lastUpdated',
        title: 'Last Updated',
        dataIndex: 'lastUpdated',
        render: (lastUpdated) => (lastUpdated ? formatDate(lastUpdated) : "N/A"),
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

const TableBody: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const schools = await SchoolService.getAllService();
                setSchools(schools);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <Table columns={columns} 
            dataSource={schools} 
            pagination={{pageSizeOptions: ['5', '10', '20'], showSizeChanger: true, defaultPageSize: 5, defaultCurrent: 1}} 
            rowKey="id"/>
        </Suspense>
    )
}

export default TableBody;