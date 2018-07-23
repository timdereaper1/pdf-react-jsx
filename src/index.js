import Context from './lib/pdf-context';
import ContextRender from './lib/pdf-renderer';

class Document extends Context.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasImage: true,
            schoolName: 'SchoolDesk International Academy',
            schoolContact: '05046811337',
            schoolLocation: 'KNUST - Kumasi',
            studentName: 'Amo Timothy Kofi',
            studentClass: 'Basic 1 B',
            studentId: 'KH-8786-O',
            showOverallPosition: true,
            studentPosition: '1st',
            schoolTerm: 'Third Term',
            schoolAcademicYear: '2018/2019',
            subjects: [
                {
                    subjectName: "Maths",
                    classScore: 23,
                    examScore: 64,
                    totalScore: 87,
                    subjectPosition: '1st',
                    subjectGrade: 'A',
                    subjectRemarks: 'Excellent',
                    subjectTag: null
                },
                {
                    subjectName: "English",
                    classScore: 20,
                    examScore: 60,
                    totalScore: 80,
                    subjectPosition: '4th',
                    subjectGrade: 'A',
                    subjectRemarks: 'Excellent',
                    subjectTag: 'Did not write exams'
                }
            ]
        }

        this.subjectsTableData = this.subjectsTableData.bind(this);
        this.tableHeader = this.tableHeader.bind(this);
    }

    subjectsTableData(){
        return this.state.subjects.map(subject => {
            if (subject.subjectTag) {
                return(
                    <row>
                        <text style='dataStyle'>{subject.subjectName}</text>
                        <text style='dataStyle' color='red' colSpan={6} bold>{subject.subjectTag}</text> 
                    </row>
                );
            }
            return (
                <row>
                    <text style='dataStyle'>{subject.subjectName}</text>
                    <text style='dataStyle'>{subject.classScore}</text>
                    <text style='dataStyle'>{subject.examScore}</text>
                    <text style='dataStyle'>{subject.totalScore}</text>
                    <text style='dataStyle'>{subject.subjectPosition}</text>
                    <text style='dataStyle'>{subject.subjectGrade}</text>
                    <text style='dataStyle'>{subject.subjectRemarks}</text>
                </row>
            );
        });
    }

    tableHeader() {
        return (
            <row>
                <row>
                    <text style='headerRow'>Subject</text>
                    <text style='headerRow'>Class</text>
                    <text style='headerRow'>Exam</text>
                    <text style='headerRow'>Total</text>
                    <text style='headerRow'>Position</text>
                    <text style='headerRow'>Grade</text>
                    <text style='headerRow'>Remarks</text>
                </row>
            </row>
        );
    }

    render() {
        const tableData = [].concat(this.tableHeader(), this.subjectsTableData());
        return (
            <content>
                <columns>
                    { (this.state.hasImage) ? <image image="school.jpg" width={70} margin={[5, 5]} /> :
                        <canvas width={70}>
                            <type type='rect' x={0} y={0} w={70} h={63.8} r={100} color='white'/>
                        </canvas> 
                    }
                    <stack width='*' margin={[0, 0, 0, 0]}>
                        <text bold color='#111' fontSize={14}>{this.state.schoolName}</text>
                        <text bold color='#777' fontSize={12}>Student Report</text>
                    </stack>
                    <stack width='auto' margin={[0, 0, 0, 0]} alignment='right'>
                        <text bold color='#111' fontSize={14}>{this.state.schoolContact}</text>
                        <text bold color='#777' fontSize={12}>{this.state.schoolLocation}</text>
                    </stack>
                </columns>
                <canvas margin={[0, 5, 0, 10]}>
                    <type type='line' x1={0} y1={5} x2={515} y2={5} lineWidth={0.1} lineColor='#b7b7b7' />
                </canvas>
                <columns>
                    <stack>
                        <text margin={[10, 8, 0, 2]} bold fontSize={12.2}>{this.state.studentName}</text>
                        <text margin={[10, 0, 0, 0]} bold fontSize={9} color='gray'>{this.state.studentClass}</text>
                        <text margin={[10, 8, 0, 10]} fontSize={12.2} color='gray'>{this.state.studentId}</text>
                    </stack>
                    {(this.state.showOverallPosition) ? 
                        <stack>
                            <text alignment='right' color='gray' margin={[0, 10, 0, 0]} fontSize={12}>Position</text>
                            <text alignment='right' color='gray' bold fontSize={15.4}>{this.state.studentPosition}</text>
                        </stack>
                        : <text text=''/>
                    }
                </columns>
                <canvas margin={[0, 5, 0, 10]}>
                    <type type='line' x1={0} y1={5} x2={515} y2={5} lineWidth={0.1} lineColor='#b7b7b7' />
                </canvas>
                <stack margin={[72.5, 0, 0, 0]}>
                    <text color='gray' fontSize={10}>{this.state.schoolAcademicYear} Academic Year</text>
                    <text color='gray' fontSize={10}>{this.state.schoolTerm}</text>
                </stack>
                <table widths={['*', 39, 39, 39, 50, 40, 55]} layout='noBorders'>
                    <body>
                        {tableData}
                    </body>
                </table>
            </content>
        );
    }
}

const styles = {
    dataStyle: {
        fontSize: 8,
        color: 'gray'
    },
    headerRow: {
        bold: true,
        fillColor: 'blue'
    },
    defaultStyles: {
        fontSize: 8,
        alignment: 'left'
    }
};

ContextRender.render(<Document />, styles);